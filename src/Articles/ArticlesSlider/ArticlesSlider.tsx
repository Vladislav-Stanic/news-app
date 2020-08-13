import { ArticleInterface } from "../ArticleInterface";
import React, { ReactElement } from "react";

import Carousel from "react-bootstrap/Carousel";
import "./ArticlesSlider.scss";

const ArticlesSlider = (props: {
  articles: ArticleInterface[];
  handleEventSingleArticle: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    article: ArticleInterface
  ) => void;
}): ReactElement => {
  const handleEventMore = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ArticleInterface
  ): void => {
    props.handleEventSingleArticle(event, item);
  };
  return (
    <Carousel>
      {props.articles.map((it: ArticleInterface, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={it.urlToImage || "https://via.placeholder.com/300x200"}
              alt={it.title}
              title={it.title}
            />
            <Carousel.Caption>
              <h5>
                <a href="#" onClick={(e) => handleEventMore(e, it)}>
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

export default ArticlesSlider;
