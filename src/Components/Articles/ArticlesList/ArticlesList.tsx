import React, { ReactElement } from "react";
import "./ArticlesList.scss";

import CardDeck from "react-bootstrap/CardDeck";

import ArticleSingle from "../ArticleSingle/ArticleSingle";
import Search from "../../Search/Search";

import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { Countries } from "../../../Service/Countries";
import { CountriesEnum } from "../../../Service/CountriesEnum";
import { PagesEnum } from "../../../Service/PagesEnum";
import { ArticleInterface } from "../ArticleInterface";

const articlesList = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  currentPage: PagesEnum;
  searchTerm: string;
  category: string;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onSearchEvent: (searchTerm: string) => void;
}): ReactElement => {
  const handleEventBack = (): void => {
    // TODO: remove this
  };
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];
  return (
    <div>
      {/* Header on top news */}
      {props.currentPage === PagesEnum.TopNews ? (
        <h1>Top news from {country}:</h1>
      ) : null}

      {/* Header on single category */}
      {props.currentPage === PagesEnum.CategorySingle ? (
        <h1>
          Top {props.category} news from {country}:
        </h1>
      ) : null}

      {/* Search input */}
      {props.currentPage === PagesEnum.Search ? (
        <Search
          searchTerm={props.searchTerm}
          country={country}
          onSearchEvent={props.onSearchEvent}
        />
      ) : null}

      {/* List of articles */}
      {props.currentPage === PagesEnum.TopNews ||
      props.currentPage === PagesEnum.CategorySingle ||
      props.currentPage === PagesEnum.Search ? (
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
      ) : null}
    </div>
  );
};

export default articlesList;
