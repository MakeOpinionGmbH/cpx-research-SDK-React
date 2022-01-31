/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent, useContext } from "react";

import { setNotificationWidgetHiding } from "../../actions/applicationActions";
import { IStore, StoreContext } from "../../utils/store";
import * as styles from "./NotificationWidget.style";

interface IProps
{
  onPress: () => void;
}

export const NotificationWidget: FunctionComponent<IProps> = ({ onPress }) =>
{
  const store = useContext<IStore>(StoreContext);

  if(!store.config.notificationWidget || !store.widgetImages.notification)
  {
    return null;
  }

  const {
    height,
    textColor,
    width,
    text,
    position,
  } = store.config.notificationWidget;

  return (
    <div css={styles.container(width, height, position)}>
      <div
        onClick={() => setNotificationWidgetHiding(true, store)}
        css={styles.closeIconWrapper}>
        <p css={[styles.closeIcon, { color: textColor }]}>&times;</p>
      </div>
      <img
        onClick={onPress}
        alt={text}
        src={store.widgetImages.notification}
        css={styles.image}
      />
    </div>
  );
};
