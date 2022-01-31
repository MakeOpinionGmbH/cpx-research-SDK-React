/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, {Fragment, FunctionComponent, useContext, useState} from "react";

import { setCpxState } from "../../actions/applicationActions";
import { IStore, StoreContext } from "../../utils/store";
import { CornerWidget } from "../cornerWidget/CornerWidget";
import { NotificationWidget } from "../notificationWidget/NotificationWidget";
import { SidebarWidget } from "../sidebarWidget/SidebarWidget";
import { WebviewWrapper } from "../webviewWrapper/WebviewWrapper";
import * as styles from "./Container.style";

export const Container: FunctionComponent = () =>
{
  const store = useContext<IStore>(StoreContext);

  if(store.cpxState === "hidden")
  {
    return null;
  }

  const onWidgetPress = (isSingleSurvey?: boolean): void =>
  {
    setCpxState(isSingleSurvey ? "webViewSingleSurvey" : "webView", store);
  };

  const isWebViewActive = store.cpxState === "webView" || store.cpxState === "webViewSingleSurvey";

  return (
    <div css={[styles.container, isWebViewActive && styles.containerWebViewActive]}>
      <div css={styles.innerContainer}>
        {store.cpxState === "widgets" && (
          <Fragment>
            <CornerWidget onPress={() => onWidgetPress(store.config.cornerWidget?.isSingleSurvey)}/>
            <SidebarWidget onPress={() => onWidgetPress(store.config.sidebarWidget?.isSingleSurvey)}/>
            {!store.isNotificationWidgetHidden && (
              <NotificationWidget onPress={() => onWidgetPress(store.config.notificationWidget?.isSingleSurvey)}/>
            )}
          </Fragment>
        )}
        {isWebViewActive && <WebviewWrapper/>}
      </div>
    </div>
  );
};
