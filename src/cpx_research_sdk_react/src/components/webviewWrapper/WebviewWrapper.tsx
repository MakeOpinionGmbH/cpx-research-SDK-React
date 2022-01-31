/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent, useContext, useState} from "react";

import { setCpxState } from "../../actions/applicationActions";
import { endpoints, urls } from "../../utils/globals";
import { buildQueryString, getRequestParams } from "../../utils/helpers";
import { IStore, StoreContext } from "../../utils/store";
import WebView from "./WebView";
import * as styles from "./Webview.style";
import { WebviewIcon } from "./webviewIcon/WebviewIcon";
import * as webviewIconStyles from "./webviewIcon/WebviewIcon.style";
import {LinearProgressIndicator} from "./linearProgressIndicator/LinearProgressIndicator";

const closeIcon = require("../../../assets/close.png");
const helpIcon = require("../../../assets/help.png");
const homeIcon = require("../../../assets/home.png");
const settingsIcon = require("../../../assets/settings.png");

interface ITabs
{
  help: string;
  home: string;
  settings: string;
}

export const WebviewWrapper: FunctionComponent = () =>
{
  const store = useContext<IStore>(StoreContext);

  const baseUrl = urls.baseUrl + endpoints.homeEndpoint;
  const requestParams = getRequestParams(store);

  const tabs: ITabs = {
    help: baseUrl + buildQueryString({
      ...requestParams,
      site: "help"
    }),
    home: baseUrl + buildQueryString({
      ...requestParams,
      survey_id: store.cpxState === "webViewSingleSurvey" ? store.singleSurveyIdForWebView : undefined,
    }),
    settings: baseUrl + buildQueryString({
      ...requestParams,
      site: "settings-webview"
    }),
  };

  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("home");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div css={styles.container}>
      <div css={styles.iconsWrapper}>
        <WebviewIcon
          icon={helpIcon}
          isActive={activeTab === "help"}
          onPress={() => setActiveTab("help")}
        />
        <WebviewIcon
          icon={settingsIcon}
          isActive={activeTab === "settings"}
          onPress={() => setActiveTab("settings")}
        />
        <WebviewIcon
          icon={homeIcon}
          isActive={activeTab === "home"}
          onPress={() => setActiveTab("home")}
        />
        <div onClick={() => setCpxState("widgets", store)}>
          <div css={webviewIconStyles.iconWrapper}>
            <img
              alt={"close webview"}
              css={webviewIconStyles.iconImage}
              src={closeIcon}
            />
          </div>
        </div>
      </div>
      <div css={styles.webViewWrapper}>
        {isLoading && <LinearProgressIndicator/>}
        <WebView
          activeTab={activeTab}
          currentUrl={tabs[activeTab]}
          onLoadEnd={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        />
      </div>
    </div>
  );
};
