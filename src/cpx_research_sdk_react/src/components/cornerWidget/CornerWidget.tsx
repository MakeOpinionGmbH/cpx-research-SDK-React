/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent, useContext } from "react";

import { IStore, StoreContext } from "../../utils/store";
import * as styles from "./CornerWidget.style";

interface IProps
{
  onPress: () => void;
}

export const CornerWidget: FunctionComponent<IProps> = ({ onPress }) =>
{
  const store = useContext<IStore>(StoreContext);

  if(!store.config.cornerWidget || !store.widgetImages.corner)
  {
    return null;
  }

  const { size, text } = store.config.cornerWidget;

  const buttonSize = size * Math.sqrt(2);
  const buttonOffset = -(size * Math.sqrt(2) / 2);

  let buttonStyle;
  let containerStyle;
  let imageStyle;

  switch (store.config.cornerWidget.position)
  {
    case "topleft":
      buttonStyle = {
        left: buttonOffset,
        top: buttonOffset,
      };
      containerStyle = {
        left: 0,
        top: 0,
      };
      imageStyle = {
        left: 0,
        top: 0
      };
      break;
    case "topright":
      buttonStyle = {
        right: buttonOffset,
        top: buttonOffset,
      };
      containerStyle = {
        right: 0,
        top: 0
      };
      imageStyle = {
        right: 0,
        top: 0
      };
      break;
    case "bottomright":
      buttonStyle = {
        bottom: buttonOffset,
        right: buttonOffset,
      };
      containerStyle = {
        bottom: 0,
        right: 0,
      };
      imageStyle = {
        bottom: 0,
        right: 0
      };
      break;
    case "bottomleft":
      buttonStyle = {
        bottom: buttonOffset,
        left: buttonOffset,
      };
      containerStyle = {
        bottom: 0,
        left: 0,
      };
      imageStyle = {
        bottom: 0,
        left: 0
      };
      break;
  }

  return (
    <div css={[styles.container, containerStyle]}>
      <img
        alt={text}
        src={store.widgetImages.corner}
        style={{
          height: size,
          width: size,
        }}
        css={[styles.image, imageStyle]}
      />
      <div
        onClick={onPress}
        style={{
          height: buttonSize,
          width: buttonSize,
        }}
        css={[styles.triangle, buttonStyle]}
      />
    </div>
  );
};
