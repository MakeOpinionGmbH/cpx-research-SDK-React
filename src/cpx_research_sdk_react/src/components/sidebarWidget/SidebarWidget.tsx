/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent, useContext } from "react";

import { IStore, StoreContext } from "../../utils/store";
import * as styles from "./SidebarWidget.style";

interface IProps
{
  onPress: () => void;
}

export const SidebarWidget: FunctionComponent<IProps> = ({ onPress }) =>
{
  const store = useContext<IStore>(StoreContext);

  if(!store.config.sidebarWidget || !store.widgetImages.sidebar)
  {
    return null;
  }

  const { height, width, position, text } = store.config.sidebarWidget;

  return (
    <div onClick={onPress}>
      <div css={styles.container(width, height, position)}>
        <img
          alt={text}
          src={store.widgetImages.sidebar}
          css={styles.image}
        />
      </div>
    </div>
  );
};
