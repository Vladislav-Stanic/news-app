import React, { ReactElement } from "react";

import Carousel from "react-bootstrap/Carousel";
import "./ArticlesSlider.scss";
import { ArticleInterface } from "../ArticleInterface";

const articlesSlider = (props: {
  articles: ArticleInterface[];
  handleEventSingleArticle: (article: ArticleInterface) => void;
}): ReactElement => {
  return (
    <Carousel>
      {props.articles.map((it: ArticleInterface, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block slider-image"
              src={it.urlToImage || "https://via.placeholder.com/300x200"}
              alt={it.title}
              title={it.title}
            />
            <Carousel.Caption>
              <h5>
                <a href="#" onClick={() => props.handleEventSingleArticle(it)}>
                  {it.title}
                </a>
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default articlesSlider;
