import {css} from "@emotion/react";

export const container = css`
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
  z-index: 999;
  pointer-events: none;
`;

export const containerWebViewActive = css`
  background-color: rgba(0,0,0,0.4);
`;

export const innerContainer = css`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const widgetShadows = css`
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));
`;
