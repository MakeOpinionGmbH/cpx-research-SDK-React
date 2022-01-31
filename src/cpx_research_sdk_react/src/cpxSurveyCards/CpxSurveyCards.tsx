/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React, { FunctionComponent } from "react";

import { ITexts } from "../utils/store";
import * as styles from "./CpxSurveyCards.style";
import {svgIcons} from "../utils/svgIcons";

interface IConfig
{
  accentColor?: string;
  cardBackgroundColor?: string;
  inactiveStarColor?: string;
  starColor?: string;
  textColor?: string;
}

interface IProps
{
  config?: IConfig;
  openWebView: ((surveyId?: string) => void) | undefined;
  surveys: any[];
  texts: ITexts;
}

export const CpxSurveyCards: FunctionComponent<IProps> = ({
  config,
  openWebView,
  surveys,
  texts,
}) =>
{
  if(!surveys || surveys.length === 0 || !texts)
  {
    return null;
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.cardsWrapper}>
        {surveys.map((survey, _) =>
        {
          const stars = survey.statistics_rating_avg || 0;
          const disabledStars = 5 - stars;

          const accentColor = config?.accentColor || "#40e2d3";
          const cardBackgroundColor = config?.cardBackgroundColor || "white";
          const textColor = config?.textColor || "black";
          const starColor = config?.starColor || "#ffc400";
          const inActiveStarColor = config?.inactiveStarColor || "#dfdfdfff";

          return (
            <div
              onClick={() => openWebView?.(survey.id)}
              css={styles.card(cardBackgroundColor)}
              key={survey.id}>
              <p css={styles.payout(accentColor)}>
                {survey.payout}
              </p>
              <p css={styles.currency(accentColor)}>
                {survey.payout === 1 ? texts.currencySingular : texts.currencyPlural}
              </p>
              <div css={styles.timeNeededWrapper}>
                <div css={styles.clockIcon(accentColor)}>
                  {svgIcons.clock}
                </div>
                <p css={styles.timeNeededText(textColor)}>
                  {survey.loi} {texts.shortcutMin}
                </p>
              </div>
              <div css={styles.starsWrapper}>
                {[...Array(stars)].map((_, index2) => (
                  <div key={index2} css={styles.star(starColor)}>
                    {svgIcons.star}
                  </div>
                ))}
                {[...Array(disabledStars)].map((_, index2) => (
                  <div key={`2-${index2}`} css={styles.star(inActiveStarColor)}>
                    {svgIcons.star}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
