import React from "react";

import { fetchSurveysAndTransactions, getWidgetImages, markTransactionAsPaid } from "./actions/apiActions";
import { setCpxState, setNotificationWidgetHiding } from "./actions/applicationActions";
import { Container } from "./components/container/Container";
import { CpxSurveyCards } from "./cpxSurveyCards/CpxSurveyCards";
import { throwErrorIfColorStringsAreNoHexColor } from "./utils/helpers";
import { createStore, ICpxConfig, IStore, StoreContext } from "./utils/store";

class CpxResearch extends React.Component<ICpxConfig, IStore>
{
  private fetchSurveysAndTransactionsInterval: NodeJS.Timer | undefined;

  public constructor(props: ICpxConfig)
  {
    super(props);

    throwErrorIfColorStringsAreNoHexColor([
      props.cornerWidget?.backgroundColor,
      props.cornerWidget?.textColor,
      props.sidebarWidget?.backgroundColor,
      props.sidebarWidget?.textColor,
      props.notificationWidget?.backgroundColor,
      props.notificationWidget?.textColor
    ]);

    this.markTransactionAsPaid = this.markTransactionAsPaid.bind(this);
    this.fetchSurveysAndTransactions = this.fetchSurveysAndTransactions.bind(this);
    this.openWebView = this.openWebView.bind(this);

    const store = createStore(props);

    store.subscribers.push((updatedStore: IStore) =>
    {
      this.setState(updatedStore);
    });

    this.state = store;
  }

  private startFetchInterval = (): void =>
  {
    this.fetchSurveysAndTransactionsInterval = setInterval(
      async () => fetchSurveysAndTransactions(this.state),
      120 * 1000 // 120 Seconds
    );
  };

  private stopFetchInterval = (): void =>
  {
    if(this.fetchSurveysAndTransactionsInterval)
    {
      clearInterval(this.fetchSurveysAndTransactionsInterval);
    }
  };

  private onSurveysUpdate(): void
  {
    if(this.props.onSurveysUpdate)
    {
      this.props.onSurveysUpdate(this.state.surveys);
    }

    if(this.state.cpxState === "webView")
    {
      // if the user currently uses the webView, do nothing
      return;
    }

    if(this.state.surveys?.length > 0)
    {
      if(this.state.cpxState === "hidden")
      {
        setCpxState("widgets", this.state);
      }

      if(this.state.isNotificationWidgetHidden)
      {
        setNotificationWidgetHiding(false, this.state);
      }
    }
    else
    {
      if(this.state.cpxState !== "hidden")
      {
        setCpxState("hidden", this.state);
      }
    }
  }

  private onTextsUpdate(): void
  {
    if(this.props.onTextsUpdate)
    {
      this.props.onTextsUpdate(this.state.texts);
    }
  }

  private onWebViewWasClosed(): void
  {
    if(this.props.onWebViewWasClosed)
    {
      this.props.onWebViewWasClosed();
    }
  }

  private onTransactionsUpdate(): void
  {
    if(this.props.onTransactionsUpdate)
    {
      this.props.onTransactionsUpdate(this.state.transactions);
    }
  }

  private openWebView(surveyId?: string): void
  {
    this.setState({ singleSurveyIdForWebView: surveyId }, () =>
    {
      setCpxState("webViewSingleSurvey", this.state);
    });
  }

  private async markTransactionAsPaid(transactionId: string, messageId: string): Promise<void>
  {
    await markTransactionAsPaid(transactionId, messageId, this.state);
    await fetchSurveysAndTransactions(this.state);
  }

  private async fetchSurveysAndTransactions(): Promise<void>
  {
    await fetchSurveysAndTransactions(this.state);
  }

  public componentDidUpdate(_prevProps: Readonly<ICpxConfig>, prevState: Readonly<IStore>): void
  {
    if((prevState.cpxState === "webViewSingleSurvey" || prevState.cpxState === "webView") &&
      (this.state.cpxState !== "webView" && this.state.cpxState !== "webViewSingleSurvey"))
    {
      this.onWebViewWasClosed();
    }

    if(JSON.stringify(prevState.surveys) !== JSON.stringify(this.state.surveys))
    {
      this.onSurveysUpdate();
    }

    if(JSON.stringify(prevState.transactions) !== JSON.stringify(this.state.transactions))
    {
      this.onTransactionsUpdate();
    }

    if(JSON.stringify(prevState.texts) !== JSON.stringify(this.state.texts))
    {
      this.onTextsUpdate();
    }
  }

  public async componentDidMount(): Promise<void>
  {
    this.props.bindMarkTransactionAsPaid?.(this.markTransactionAsPaid);
    this.props.bindFetchSurveysAndTransactions?.(this.fetchSurveysAndTransactions);
    this.props.bindOpenWebView?.(this.openWebView);

    void await fetchSurveysAndTransactions(this.state);
    getWidgetImages(this.state);

    this.startFetchInterval();
  }

  public componentWillUnmount(): void
  {
    this.stopFetchInterval();
  }

  public render(): React.ReactElement | null
  {
    if(this.props.isHidden)
    {
      return null;
    }

    return (
      <StoreContext.Provider value={this.state}>
        <Container/>
      </StoreContext.Provider>
    );
  }
}

export default CpxResearch;
export { CpxSurveyCards };
