import React, { ReactElement } from 'react';
import './ArticlesList.scss';

import CardDeck from 'react-bootstrap/CardDeck';

import ArticleSingle from '../ArticleSingle/ArticleSingle';

import { ArticleTypeEnum } from '../ArticleTypeEnum';
import { ArticleInterface } from '../ArticleInterface';
import { CountriesEnum } from '../../../../Service/CountriesEnum';
import InfiniteScroll from 'react-infinite-scroll-component';

const articlesList = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  hasMoreOnScroll: boolean;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onFetchMoreData: () => any;
}): ReactElement => {
  return (
    <div>
      {props.articles.length ? (
        <InfiniteScroll
          dataLength={props.articles.length}
          next={props.onFetchMoreData}
          hasMore={props.hasMoreOnScroll}
          loader={<h4>Loading...</h4>}
        >
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
            })}{' '}
          </CardDeck>
        </InfiniteScroll>
      ) : (
        <h4>No results.</h4>
      )}
    </div>
  );
};

export default articlesList;
