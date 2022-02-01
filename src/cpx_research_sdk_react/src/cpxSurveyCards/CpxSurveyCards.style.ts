import {css} from "@emotion/react";

const clockIconSize = 20;
const starIconSize = 24;

export const wrapper = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  * {
    font-family: sans-serif;
  }
  p {
    margin: 0;
  }
`;

export const cardsWrapper = css`
  padding-bottom: 20px;
  display: flex;
`;

export const card = (bgCol: string) => css`
  align-items: center;
  background-color: ${bgCol};
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  height: 180px;
  justify-content: center;
  margin: 0 6px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.12);
  width: 160px;
  cursor: pointer;
  transition: background-color ease .2s;
  border: solid #e2e2e2 1px;
  box-sizing: border-box;

  &:hover, &:active, &:focus {
    background-color: #f7f7f7;
  }
`;

export const payout = (color: string) => css`
  color: ${color};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 2px !important;
`;

export const currency = (color: string) => css`
  color: ${color};
  font-size: 16px;
  font-weight: 700;
`;

export const timeNeededWrapper = css`
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin: 16px 0 !important;
`;

export const timeNeededText = (color: string) => css`
  font-size: 15px;
  font-weight: 500;
  color: ${color};
`;

export const clockIcon = (color: string) => css`
  height: ${clockIconSize}px;
  width: ${clockIconSize}px;
  margin-right: 5px;
  svg {
    width: 100%;
    height: auto;
    fill: ${color};
  }
`;

export const starsWrapper = css`
  flex-direction: row;
  display: flex;
`;

export const star = (color: string) => css`
  height: ${starIconSize}px;
  width: ${starIconSize}px;
  margin: 0 -2px;
  svg {
    width: 100%;
    height: auto;
    fill: ${color};
  }
`;
