/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent } from "react";

import * as styles from "./LinearProgressIndicator.style";

export const LinearProgressIndicator: FunctionComponent = () => (
  <div css={styles.slider}>
    <div css={styles.line}/>
    <div css={[styles.subLine, styles.inc]}/>
    <div css={[styles.subLine, styles.dec]}/>
  </div>
)
