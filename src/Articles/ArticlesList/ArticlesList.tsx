import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";

import ArticleCard from "../ArticleSingle/ArticleSingle";

import { ArticleInterface } from "../ArticleInterface";
import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { Countries } from "../../Service/Countries";
import { CountriesEnum } from "../../Service/CountriesEnum";
import { DebounceInput } from "react-debounce-input";
import { PagesEnum } from "../../Service/PagesEnum";

const articlesList = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  currentPage: PagesEnum;
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
  console.log("props.currentPage === ", props.currentPage);
  return (
    <div>
      {/* Header on top news */}
      {props.currentPage === PagesEnum.TopNews ? (
        <h1>Top news from {country}:</h1>
      ) : null}

      {/* Header on single category */}
      {props.currentPage === PagesEnum.CategorySingle ? (
        <h1>Top ??? news from {country}:</h1>
      ) : null}

      {/* Search input */}
      {props.currentPage === PagesEnum.Search ? (
        <React.Fragment>
          <h1>Search top news from {country} by term:</h1>
          <div className="search-form">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              value={props.searchTerm}
              onChange={(e) => handleEventSearch(e.target.value)}
              className={`form-control form-control-lg search-input`}
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
      ) : null}

      {/* List of articles */}
      {props.currentPage === PagesEnum.TopNews ||
      props.currentPage === PagesEnum.CategorySingle ||
      props.currentPage === PagesEnum.Search ? (
        <CardDeck>
          {props.articles.map((item: ArticleInterface, index: number) => {
            return (
              <ArticleCard
                key={index}
                item={item}
                type={ArticleTypeEnum.SingleCard}
                onArticleMoreEvent={handleEventMore}
                onArticleBackEvent={handleEventBack}
              />
            );
          })}{" "}
        </CardDeck>
      ) : null}
    </div>
  );
};

export default articlesList;
