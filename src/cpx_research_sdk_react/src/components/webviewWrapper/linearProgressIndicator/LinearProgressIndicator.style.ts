import {css} from "@emotion/react";

const height = 6;

export const slider = css`
  position: absolute;
  width: 100%;
  height: ${height}px;
  overflow-x: hidden;
`;

export const line = css`
  position: absolute;
  background: white;
  width: 150%;
  height: ${height}px;
`;

export const subLine = (color: string) => css`
  position: absolute;
  background: ${color};
  height: ${height}px;
`;

export const inc = css`
  animation: linear-progress-indicator-increase 2s infinite;
  
  @keyframes linear-progress-indicator-increase {
    from { left: -5%; width: 5%; }
    to { left: 130%; width: 100%;}
  }
`;

export const dec = css`
  animation: linear-progress-indicator-decrease 2s 0.5s infinite;

  @keyframes linear-progress-indicator-decrease {
    from { left: -80%; width: 80%; }
    to { left: 110%; width: 10%;}
  }
`;
