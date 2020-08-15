import React, { ReactElement } from "react";
import { CountriesEnum } from "../../Service/CountriesEnum";
import { Countries } from "../../Service/Countries";
import { CategoriesItem } from "./CategoriesItem";

import ArticlesSlider from "../Articles/ArticlesSlider/ArticlesSlider";

import "./Categories.scss";
import { ArticleInterface } from "../Articles/ArticleInterface";

const categories = (props: {
  articlesPerCategory: CategoriesItem[];
  countryCode: CountriesEnum;
  handleEventSingleCategory: (name: string) => void;
  handleEventSingleArticle: (article: ArticleInterface) => void;
  handleEventToggle: (index: number) => void;
}): ReactElement => {
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];

  const handleEventCategory = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    name: string
  ): void => {
    event.stopPropagation();
    props.handleEventSingleCategory(name);
  };

  return (
    <React.Fragment>
      <h1>Top 5 news by categories from {country}:</h1>
      {props.articlesPerCategory.map((it, index) => {
        return (
          <React.Fragment key={index}>
            <h3
              className="panel-title"
              onClick={() => props.handleEventToggle(index)}
            >
              <a
                href="#"
                onClick={(event) => handleEventCategory(event, it.name)}
              >
                <span className="capitalize">{it.name}</span>
              </a>
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
                handleEventSingleArticle={props.handleEventSingleArticle}
              />
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default categories;
