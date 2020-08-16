import React, { ReactElement } from "react";
// import "./ArticlesList.scss";

// import { ArticleTypeEnum } from "../ArticleTypeEnum";
// import { Countries } from "../../../../Service/Countries";
import Container from "react-bootstrap/esm/Container";
import Categories from "./Categories/Categories";
import ArticleSingle from "./Articles/ArticleSingle/ArticleSingle";
import { ArticleInterface } from "./Articles/ArticleInterface";
import { CountriesEnum } from "../../Service/CountriesEnum";
import { PagesEnum } from "../../Service/PagesEnum";
import { CategoriesItem } from "./Categories/CategoriesItem";
import { Route, useHistory } from "react-router-dom";
import TopNews from "./TopNews/TopNews";
import Search from "./Search/Search";
import { Countries } from "../../Service/Countries";
import { ArticleTypeEnum } from "./Articles/ArticleTypeEnum";

const main = (props: {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  currentPage: PagesEnum;
  searchTerm: string;
  category: string;
  articlesPerCategory: CategoriesItem[];
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onSearchEvent: (searchTerm: string) => void;
  onArticleBackEvent: () => void;
  onSingleCategory: (category: string) => void;
  onToggleCategory: (index: number) => void;
}): ReactElement => {
  const handleEventBack = (): void => {
    // TODO: remove this
  };
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];

  console.log("props ===== ", props);
  return (
    <Container className="container-main">
      <Route
        path={["/", "/topNews"]}
        exact
        render={() => (
          <TopNews
            articles={props.articles}
            country={country}
            onArticleMoreEvent={props.onArticleMoreEvent}
          />
        )}
      />
      <Route
        path="/categories"
        exact
        render={() => (
          <Categories
            articlesPerCategory={props.articlesPerCategory}
            country={country}
            onArticleMoreEvent={props.onArticleMoreEvent}
            handleEventSingleCategory={props.onSingleCategory}
            handleEventToggle={props.onToggleCategory}
          />
        )}
      />
      <Route
        path="/search"
        exact
        render={() => (
          <Search
            articles={props.articles}
            country={country}
            searchTerm={props.searchTerm}
            onArticleMoreEvent={props.onArticleMoreEvent}
            onSearchEvent={props.onSearchEvent}
          />
        )}
      />
      {/* {props.articleSingle != null ? ( */}
      <Route
        path="/articleSingle"
        exact
        render={() => (
          <ArticleSingle
            item={props.articleSingle!}
            type={ArticleTypeEnum.SingleDetails}
            onArticleMoreEvent={props.onArticleMoreEvent}
            onArticleBackEvent={props.onArticleBackEvent}
          />
        )}
      />
      {/* )
       : (
        <TopNews
          articles={props.articles}
          country={country}
          onArticleMoreEvent={props.onArticleMoreEvent}
        />
      )} */}

      {props.isLoading === true ? <div className="loader"></div> : null}
    </Container>
  );
};

export default main;
