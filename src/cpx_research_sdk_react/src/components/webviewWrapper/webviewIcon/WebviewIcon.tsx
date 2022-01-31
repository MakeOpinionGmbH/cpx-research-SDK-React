/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import React, { FunctionComponent, useContext } from "react";

import { IStore, StoreContext } from "../../../utils/store";
import * as styles from "./WebviewIcon.style";

interface IProps
{
  icon: string;
  isActive: boolean;
  onPress: () => void;
}

export const WebviewIcon: FunctionComponent<IProps> = ({
  icon,
  isActive,
  onPress,
}) =>
{
  const store = useContext<IStore>(StoreContext);

  return (
    <div
      onClick={onPress}
      css={styles.iconWrapper}
      style={isActive ? { backgroundColor: store.config.accentColor } : {}}>
      <img
        alt={"icon"}
        css={styles.iconImage}
        src={icon}
      />
    </div>
  );
};
