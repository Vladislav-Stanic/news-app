import React, { ReactElement } from "react";

import { ArticleInterface } from "../Articles/ArticleInterface";
import ArticlesList from "../Articles/ArticlesList/ArticlesList";

const topNews = (props: {
  articles: ArticleInterface[];
  country: string;
  onArticleMoreEvent: (article: ArticleInterface) => void;
}): ReactElement => {
  return (
    <div>
      {/* Header on top news */}
      <h1>Top news from {props.country}:</h1>

      {/* List of articles */}
      <ArticlesList
        articles={props.articles}
        onArticleMoreEvent={props.onArticleMoreEvent}
      />
    </div>
  );
};

export default topNews;
