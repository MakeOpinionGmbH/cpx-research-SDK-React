import {css} from "@emotion/react";
import {ISidebarWidgetPosition} from "../../utils/store";
import {widgetShadows} from "../container/Container.style";

export const container = (width: number, height: number, position: ISidebarWidgetPosition) => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: ${height}px;
  width: ${width}px;
  left: ${position === "left" ? "0" : "unset"};
  right: ${position === "right" ? "0" : "unset"};
  cursor: pointer;
  pointer-events: auto;
  ${widgetShadows}
`;

export const image = css`
  height: 100%;
  width: 100%;
`;
