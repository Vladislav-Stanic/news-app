import React, { ReactElement } from 'react';

import { ArticleInterface } from '../Articles/ArticleInterface';
import ArticlesList from '../Articles/ArticlesList/ArticlesList';
import { CountriesEnum } from '../../../Service/CountriesEnum';

const categorySingle = (props: {
  articles: ArticleInterface[];
  country: string;
  countryCode: CountriesEnum;
  category: string;
  hasMoreOnScroll: boolean;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onFetchMoreData: () => any;
}): ReactElement => {
  return (
    <div>
      {/* Header on Category single news */}
      <h1>
        Top {props.category} news from {props.country}:
      </h1>

      {/* List of articles */}
      <ArticlesList
        articles={props.articles}
        countryCode={props.countryCode}
        hasMoreOnScroll={props.hasMoreOnScroll}
        onArticleMoreEvent={props.onArticleMoreEvent}
        onFetchMoreData={props.onFetchMoreData}
      />
    </div>
  );
};

export default categorySingle;
