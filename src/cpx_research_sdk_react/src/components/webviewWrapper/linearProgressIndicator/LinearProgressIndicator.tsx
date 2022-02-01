/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, {FunctionComponent, useContext} from "react";

import * as styles from "./LinearProgressIndicator.style";
import {IStore, StoreContext} from "../../../utils/store";

export const LinearProgressIndicator: FunctionComponent = () =>
{
  const store = useContext<IStore>(StoreContext);
  const color = store.config.accentColor || "#FF9900";

  return (
    <div css={styles.slider}>
      <div css={styles.line}/>
      <div css={[styles.subLine(color), styles.inc]}/>
      <div css={[styles.subLine(color), styles.dec]}/>
    </div>
  );
}
