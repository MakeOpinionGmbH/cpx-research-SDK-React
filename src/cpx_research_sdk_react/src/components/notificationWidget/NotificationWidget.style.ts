import {css} from "@emotion/react";
import {INotificationWidgetPosition} from "../../utils/store";
import {widgetShadows} from "../container/Container.style";

export const container = (width: number, height: number, position: INotificationWidgetPosition) => css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: ${width}px;
  height: ${height}px;
  top: ${position === "top" ? "0" : "unset"};
  bottom: ${position === "bottom" ? "0" : "unset"};
  cursor: pointer;
  pointer-events: auto;
  ${widgetShadows}
`;

export const image = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const closeIconWrapper = css`
  align-items: center;
  height: 34px;
  justify-content: center;
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  width: 34px;
  z-index: 1;
  transition: opacity ease .2s;
  &:hover {
    opacity: .65;
  }
`;

export const closeIcon = css`
  font-size: 26px;
`;
