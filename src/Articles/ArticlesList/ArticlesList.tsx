import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";

import ArticleCard from "../ArticleSingle/ArticleSingle";

import { ArticleInterface } from "../article-interface";
import { ArticleTypeEnum } from "../ArticleTypeEnum";

const articlesList = (props: {
  articles: ArticleInterface[];
  onArticleMoreEvent: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ArticleInterface
  ) => void;
}): ReactElement => {
  const handleEventMore = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ArticleInterface
  ): void => {
    props.onArticleMoreEvent(event, item);
  };
  const handleEventBack = (): void => {
    // TODO: remove this
  };
  return (
    <div>
      <h1>Top news from Great Britain:</h1>

      <CardDeck>
        {props.articles.map((item: ArticleInterface, index: number) => {
          return (
            <ArticleCard
              item={item}
              type={ArticleTypeEnum.SingleCard}
              key={index}
              onArticleMoreEvent={handleEventMore}
              onArticleBackEvent={handleEventBack}
            />
          );
        })}{" "}
      </CardDeck>
    </div>
  );
};

export default articlesList;
