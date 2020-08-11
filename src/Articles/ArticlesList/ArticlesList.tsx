import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ArticleCard from "../ArticleSingle/ArticleSingle";

import { ArticleInterface } from "../ArticleInterface";
import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { Countries } from "../../Service/Countries";
import { CountriesEnum } from "../../Service/CountriesEnum";

const articlesList = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  searchActive: boolean;
  searchTerm: string;
  onArticleMoreEvent: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ArticleInterface
  ) => void;
  onSearchEvent: (searchTerm: string) => void;
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
  const handleEventSearch = (value: string): void => {
    props.onSearchEvent(value);
  };
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];
  return (
    <div>
      {props.searchActive === false ? (
        <h1>Top news from {country}:</h1>
      ) : (
        <React.Fragment>
          <h1>Search top news from {country} by term:</h1>
          <div className="search-form">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search term..."
              value={props.searchTerm}
              onChange={(e) => handleEventSearch(e.target.value)}
              className="search-input"
            />
            <Button
              variant="secondary"
              className="search-clear"
              title="Clear"
              onClick={() => handleEventSearch("")}
            >
              X
            </Button>{" "}
          </div>
        </React.Fragment>
      )}

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
