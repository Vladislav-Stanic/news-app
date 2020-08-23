import React, { ReactElement } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import './ArticlesSlider.scss';
import { ArticleInterface } from '../ArticleInterface';
import { Link } from 'react-router-dom';
import { CountriesEnum } from '../../../../Service/CountriesEnum';

const articlesSlider = (props: {
  articles: ArticleInterface[];
  countryCode: CountriesEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
}): ReactElement => {
  return (
    <Carousel>
      {props.articles.map((it: ArticleInterface, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block slider-image"
              src={it.urlToImage || 'https://via.placeholder.com/300x200'}
              alt={it.title}
              title={it.title}
            />
            <Carousel.Caption>
              <h5>
                <Link
                  to={`/${props.countryCode}/article-single`}
                  className="nav-link"
                  onClick={() => props.onArticleMoreEvent(it)}
                >
                  {' '}
                  {it.title}
                </Link>
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default articlesSlider;
