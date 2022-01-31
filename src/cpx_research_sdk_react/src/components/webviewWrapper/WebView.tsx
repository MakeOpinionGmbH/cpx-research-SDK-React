/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { Component, ReactElement } from "react";
import * as styles from "./Webview.style";

interface IProps
{
  activeTab: string;
  currentUrl: string;
  onLoadEnd: () => void;
  onLoadStart: () => void;
}

class WebView extends Component<IProps>
{
  public shouldComponentUpdate(nextProps: Readonly<IProps>): boolean
  {
    return this.props.activeTab !== nextProps.activeTab;
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, _: Readonly<{}>)
  {
    if(prevProps.currentUrl !== this.props.currentUrl)
    {
      this.props.onLoadStart();
    }
  }

  public render(): ReactElement
  {
    return (
      <iframe
        onLoad={this.props.onLoadEnd}
        src={this.props.currentUrl}
        css={styles.iframe}
        frameBorder="0"
      />
    );
  }
}

export default WebView;
