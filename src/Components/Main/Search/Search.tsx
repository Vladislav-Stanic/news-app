import React, { ReactElement } from "react";

import Button from "react-bootstrap/Button";
import { DebounceInput } from "react-debounce-input";

import "./Search.scss";
import ArticlesList from "../Articles/ArticlesList/ArticlesList";
import { ArticleInterface } from "../Articles/ArticleInterface";
import { CountriesEnum } from "../../../Service/CountriesEnum";

const search = (props: {
  articles: ArticleInterface[];
  searchTerm: string;
  country: string;
  countryCode: CountriesEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onSearchEvent: (searchTerm: string) => void;
}): ReactElement => {
  const handleEventSearch = (value: string): void => {
    props.onSearchEvent(value);
  };
  return (
    <div>
      {/* Search input */}
      <React.Fragment>
        <h1>Search top news from {props.country} by term:</h1>
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

        {/* List of articles */}
        <ArticlesList
          articles={props.articles}
          countryCode={props.countryCode}
          onArticleMoreEvent={props.onArticleMoreEvent}
        />
      </React.Fragment>
    </div>
  );
};

export default search;
