import {css} from "@emotion/react";
import {widgetShadows} from "../container/Container.style";

export const container = css`
  position: absolute;
  pointer-events: auto;
`;

export const image = css`
  position: absolute;
  pointer-events: none;
  ${widgetShadows}
`;

export const triangle = css`
  position: absolute;
  transform: rotate(-45deg);
  z-index: 1;
  cursor: pointer;
`;
