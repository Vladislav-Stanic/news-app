import React, { ReactElement } from "react";
import { CategoriesItem } from "./CategoriesItem";

import ArticlesSlider from "../Articles/ArticlesSlider/ArticlesSlider";

import "./Categories.scss";
import { ArticleInterface } from "../Articles/ArticleInterface";
import { Link } from "react-router-dom";
import { CountriesEnum } from "../../../Service/CountriesEnum";

const categories = (props: {
  articlesPerCategory: CategoriesItem[];
  country: string;
  countryCode: CountriesEnum;
  handleEventSingleCategory: (name: string) => void;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  handleEventToggle: (index: number) => void;
}): ReactElement => {
  const handleEventCategory = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    name: string
  ): void => {
    event.stopPropagation();
    props.handleEventSingleCategory(name);
  };

  return (
    <React.Fragment>
      <h1>Top 5 news by categories from {props.country}:</h1>
      {props.articlesPerCategory.map((it, index) => {
        return (
          <React.Fragment key={index}>
            <h3
              className="panel-title"
              onClick={() => props.handleEventToggle(index)}
            >
              <Link
                to={`/${props.countryCode}/categorySingle`}
                onClick={(event) => handleEventCategory(event, it.name)}
              >
                {" "}
                <span className="capitalize">{it.name}</span>
              </Link>

              <div className="toggler">
                <i
                  className={`chevron
                ${it.hidden ? "down" : "up"}
              `}
                ></i>
              </div>
            </h3>
            <div
              className={`c-block
                ${it.hidden ? "is-collapsed" : "is-expanded"}
              `}
            >
              <ArticlesSlider
                articles={it.articles}
                countryCode={props.countryCode}
                onArticleMoreEvent={props.onArticleMoreEvent}
              />
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default categories;
