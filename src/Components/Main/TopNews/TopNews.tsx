import React, { ReactElement } from "react";

import { ArticleInterface } from "../Articles/ArticleInterface";
import ArticlesList from "../Articles/ArticlesList/ArticlesList";
import { CountriesEnum } from "../../../Service/CountriesEnum";

const topNews = (props: {
  articles: ArticleInterface[];
  country: string;
  countryCode: CountriesEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
}): ReactElement => {
  return (
    <div>
      {/* Header on top news */}
      <h1>Top news from {props.country}:</h1>

      {/* List of articles */}
      <ArticlesList
        articles={props.articles}
        countryCode={props.countryCode}
        onArticleMoreEvent={props.onArticleMoreEvent}
      />
    </div>
  );
};

export default topNews;
