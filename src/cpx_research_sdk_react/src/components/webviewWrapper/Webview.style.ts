import {css} from "@emotion/react";

export const container = css`
  height: calc(100% - 30px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: calc(100% - 30px);
  display: flex;
  pointer-events: auto;
  flex-direction: column;
`;

export const iconsWrapper = css`
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
`;

export const webViewWrapper = css`
  background-color: white;
  margin: 0;
  display: flex;
  flex: 1;
  border-radius: 10px;
  position: relative;
`;

export const iframe = css`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 10px 10px;
`;
