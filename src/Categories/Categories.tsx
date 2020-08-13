import React, { ReactElement } from "react";
import { CountriesEnum } from "../Service/CountriesEnum";
import { Countries } from "../Service/Countries";
import { CategoriesItem } from "./CategoriesItem";

import ArticlesSlider from "../Articles/ArticlesSlider/ArticlesSlider";

import "./Categories.scss";
import { ArticleInterface } from "../Articles/ArticleInterface";
import Button from "react-bootstrap/Button";

const Categories = (props: {
  articlesPerCategory: CategoriesItem[];
  countryCode: CountriesEnum;
  handleEventSingleCategory: (name: string) => void;
  handleEventSingleArticle: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    article: ArticleInterface
  ) => void;
}): ReactElement => {
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];
  // const newList = [...props.articlesPerCategory];
  // for (const item of newList) {
  //   item.hidden = true;
  // }

  // console.log("newList ==== ", newList);
  // const handleToggle = (item: CategoriesItem) => {
  //   item.hidden = !item.hidden;
  //   console.log("item ==== ", item);
  // };
  return (
    <React.Fragment>
      <h1>Top 5 news by categories from {country}:</h1>
      {props.articlesPerCategory.map((it, index) => {
        return (
          <React.Fragment key={index}>
            <h3>
              &bull;{" "}
              <a
                href="#"
                onClick={() => props.handleEventSingleCategory(it.name)}
              >
                <span className="capitalize">{it.name}</span>
              </a>
              {/* <button onClick={() => handleToggle(index)}>&#x2304;</button> */}
              <Button
                variant="secondary"
                title="Clear"
                // onClick={() => handleToggle(it)}
              >
                &#x2304;
              </Button>{" "}
            </h3>
            {/* <div className={it.hidden == false ? "hidden" : "visible"}>
              ----{it.hidden}==== */}
            <ArticlesSlider
              articles={it.articles}
              handleEventSingleArticle={props.handleEventSingleArticle}
            />
            {/* </div> */}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default Categories;
