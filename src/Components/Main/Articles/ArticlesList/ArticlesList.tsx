import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";

import ArticleSingle from "../ArticleSingle/ArticleSingle";

import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { ArticleInterface } from "../ArticleInterface";

const articlesList = (props: {
  articles: ArticleInterface[];
  onArticleMoreEvent: (article: ArticleInterface) => void;
  // onSearchEvent: (searchTerm: string) => void;
}): ReactElement => {
  const handleEventBack = (): void => {
    // TODO: remove this
  };
  return (
    <div>
      <CardDeck>
        {props.articles.map((item: ArticleInterface, index: number) => {
          return (
            <ArticleSingle
              key={index}
              item={item}
              type={ArticleTypeEnum.SingleCard}
              onArticleMoreEvent={props.onArticleMoreEvent}
              onArticleBackEvent={handleEventBack}
            />
          );
        })}{" "}
      </CardDeck>
    </div>
  );
};

export default articlesList;
