import React, { ReactElement } from "react";
import "./App.scss";

import Container from "react-bootstrap/Container";

import { ArticleInterface } from "./Articles/ArticleInterface";

import Header from "./Header/Header";
import ArticlesList from "./Articles/ArticlesList/ArticlesList";
import ArticleCard from "./Articles/ArticleSingle/ArticleSingle";
import { ArticleTypeEnum } from "./Articles/ArticleTypeEnum";
import { getArticles } from "./Service/Service";

import { CountriesEnum } from "./Service/CountriesEnum";
import { country_code } from "./config/config";

type MyProps = unknown;
type MyState = {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  category: string;
  searchActive: boolean;
  searchTerm: string;
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
      searchActive: false,
      searchTerm: "",
    };
  }

  componentDidMount(): void {
    getArticles(null, null, null).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        articleSingle: null,
      });
    });
  }

  render(): ReactElement {
    const handleEventSingle = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      item: ArticleInterface
    ): void => {
      this.setState({
        articleSingle: item,
        countryDisabled: true,
      });
    };

    const handleEventBack = (): void => {
      this.setState({
        articleSingle: null,
        countryDisabled: false,
      });
    };

    const handleEventTopNews = (): void => {
      getArticles(null, null, null).then((it) => {
        this.setState({
          articles: it,
          articleSingle: null,
          countryDisabled: false,
          searchActive: false,
          searchTerm: "",
        });
      });
    };

    const handleEventCountry = (country: CountriesEnum): void => {
      getArticles(country, null, null).then((it) => {
        this.setState({
          articles: it,
          countryCode: country,
          searchTerm: "",
        });
      });
    };

    const handleEventSearchActive = (): void => {
      this.setState({
        articleSingle: null,
        countryDisabled: false,
        searchActive: true,
      });
    };

    const handleEventSearch = (value: string): void => {
      getArticles(this.state.countryCode, null, value).then((it) => {
        this.setState({
          articles: it,
          searchTerm: value,
        });
      });
    };

    return (
      <div className="App">
        <Header
          country={this.state.countryCode}
          countryDisabled={this.state.countryDisabled}
          onTopNewsEvent={handleEventTopNews}
          onCountryEvent={handleEventCountry}
          onSearchEvent={handleEventSearchActive}
        />

        <Container className="container-main">
          {this.state.articleSingle == null ? (
            <ArticlesList
              articles={this.state.articles}
              searchActive={this.state.searchActive}
              searchTerm={this.state.searchTerm}
              countryCode={this.state.countryCode}
              onArticleMoreEvent={handleEventSingle}
              onSearchEvent={handleEventSearch}
            />
          ) : null}
          {this.state.articleSingle != null ? (
            <ArticleCard
              item={this.state.articleSingle}
              type={ArticleTypeEnum.SingleDetails}
              onArticleBackEvent={handleEventBack}
              onArticleMoreEvent={handleEventSingle}
            />
          ) : null}
        </Container>
      </div>
    );
  }
}

export default App;
