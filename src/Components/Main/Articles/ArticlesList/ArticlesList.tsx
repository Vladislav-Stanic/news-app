import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";

import ArticleSingle from "../ArticleSingle/ArticleSingle";

import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { ArticleInterface } from "../ArticleInterface";
import { CountriesEnum } from "../../../../Service/CountriesEnum";

const articlesList = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
}): ReactElement => {
  return (
    <div>
      {props.articles.length ? (
        <CardDeck>
          {props.articles.map((item: ArticleInterface, index: number) => {
            return (
              <ArticleSingle
                key={index}
                item={item}
                type={ArticleTypeEnum.SingleCard}
                countryCode={props.countryCode}
                onArticleMoreEvent={props.onArticleMoreEvent}
              />
            );
          })}{" "}
        </CardDeck>
      ) : (
        <h4>No results.</h4>
      )}
    </div>
  );
};

export default articlesList;
