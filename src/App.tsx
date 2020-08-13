import React, { ReactElement } from "react";
import "./App.scss";

import Container from "react-bootstrap/Container";

import { ArticleInterface } from "./Articles/ArticleInterface";

import Header from "./Header/Header";
import ArticlesList from "./Articles/ArticlesList/ArticlesList";
import ArticleCard from "./Articles/ArticleSingle/ArticleSingle";
import { ArticleTypeEnum } from "./Articles/ArticleTypeEnum";
import Categories from "./Categories/Categories";

import { CountriesEnum } from "./Service/CountriesEnum";
import { country_code, CategoriesList } from "./Service/Config";
import { CategoriesItem } from "./Categories/CategoriesItem";
import { NavPagesEnum } from "./Service/NavPagesEnum";
import { PagesEnum } from "./Service/PagesEnum";
import { getArticles } from "./Service/Service";

type MyProps = unknown;
type MyState = {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  category: string;
  searchTerm: string;
  currentPage: PagesEnum;
  previousPage: PagesEnum;
  articlesPerCategory: CategoriesItem[];
  results: string | null;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);
    this.state = {
      isLoading: true,
      articles: [],
      articleSingle: null,
      countryCode: country_code,
      countryDisabled: false,
      category: "",
      searchTerm: "",
      currentPage: PagesEnum.TopNews,
      previousPage: PagesEnum.TopNews,
      articlesPerCategory: [],
      results: null,
    };
  }

  componentDidMount(): void {
    getArticles(null, null, null, null).then((it) => {
      console.log("it =========== ", it);
      this.setState({
        isLoading: false,
        articles: it,
        articleSingle: null,
      });
    });
  }

  render(): ReactElement {
    // Navigate to single article
    const handleEventSingle = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      item: ArticleInterface
    ): void => {
      const prevoiusPage: PagesEnum = this.state.currentPage;

      this.setState({
        articleSingle: item,
        countryDisabled: true,
        currentPage: PagesEnum.Single,
        previousPage: prevoiusPage,
      });
    };

    // Go to list from single article
    const handleEventBack = (): void => {
      this.setState({
        articleSingle: null,
        countryDisabled: false,
        currentPage: this.state.previousPage,
      });
    };

    // Navigate to a page
    const handleEventPage = async (page: NavPagesEnum): Promise<void> => {
      switch (page) {
        case NavPagesEnum.Categories:
          this.setState({
            isLoading: true,
          });

          const categories: CategoriesItem[] = [];
          for (const item of CategoriesList) {
            categories.push({
              name: item,
              articles: await getArticles(
                this.state.countryCode,
                item,
                "5",
                null
              ),
            });
          }

          this.setState({
            isLoading: false,
            articleSingle: null,
            countryDisabled: false,
            currentPage: PagesEnum.Categories,
            articlesPerCategory: categories,
          });
          break;
        case NavPagesEnum.Search:
          this.setState({
            articleSingle: null,
            countryDisabled: false,
            currentPage: PagesEnum.Search,
          });
          break;
        case NavPagesEnum.TopNews:
        default:
          getArticles(this.state.countryCode, null, null, null).then((it) => {
            this.setState({
              articles: it,
              articleSingle: null,
              countryDisabled: false,
              searchTerm: "",
              currentPage: PagesEnum.TopNews,
              category: "",
            });
          });
          break;
      }
    };

    // Change country
    const handleEventCountry = async (
      country: CountriesEnum
    ): Promise<void> => {
      if (this.state.currentPage === PagesEnum.Categories) {
        this.setState({
          isLoading: true,
        });

        const categories: CategoriesItem[] = [];
        for (const item of CategoriesList) {
          categories.push({
            name: item,
            articles: await getArticles(
              this.state.countryCode,
              item,
              "5",
              null
            ),
          });
        }

        this.setState({
          isLoading: false,
          articlesPerCategory: categories,
          countryCode: country,
        });
      } else {
        getArticles(country, null, this.state.results, null).then((it) => {
          this.setState({
            articles: it,
            countryCode: country,
            searchTerm: "",
          });
        });
      }
    };

    // Enter search term
    const handleEventSearch = (value: string): void => {
      getArticles(this.state.countryCode, null, null, value).then((it) => {
        this.setState({
          articles: it,
          searchTerm: value,
        });
      });
    };

    // Single category
    const handleEventSingleCategory = (category: string): void => {
      getArticles(this.state.countryCode, category, null, null).then((it) => {
        this.setState({
          articles: it,
          category: category,
          currentPage: PagesEnum.CategorySingle,
        });
      });
    };

    return (
      <div className="App">
        <Header
          country={this.state.countryCode}
          countryDisabled={this.state.countryDisabled}
          currentPage={this.state.currentPage}
          onPageEvent={handleEventPage}
          onCountryEvent={handleEventCountry}
        />

        <Container className="container-main">
          {this.state.currentPage === PagesEnum.TopNews ||
          this.state.currentPage === PagesEnum.Search ||
          this.state.currentPage === PagesEnum.CategorySingle ? (
            <ArticlesList
              articles={this.state.articles}
              currentPage={this.state.currentPage}
              searchTerm={this.state.searchTerm}
              countryCode={this.state.countryCode}
              category={this.state.category}
              onArticleMoreEvent={handleEventSingle}
              onSearchEvent={handleEventSearch}
            />
          ) : null}

          {this.state.currentPage === PagesEnum.Categories ? (
            <Categories
              articlesPerCategory={this.state.articlesPerCategory}
              countryCode={this.state.countryCode}
              handleEventSingleCategory={handleEventSingleCategory}
              handleEventSingleArticle={handleEventSingle}
            />
          ) : null}

          {this.state.currentPage === PagesEnum.Single &&
          this.state.articleSingle != null ? (
            <ArticleCard
              item={this.state.articleSingle}
              type={ArticleTypeEnum.SingleDetails}
              onArticleBackEvent={handleEventBack}
              onArticleMoreEvent={handleEventSingle}
            />
          ) : null}

          {this.state.isLoading === true ? (
            <div className="loader"></div>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default App;
