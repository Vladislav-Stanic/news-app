import React, { ReactElement } from "react";
import "./App.scss";

import Container from "react-bootstrap/Container";

import { ArticleInterface } from "./Articles/article-interface";

import Header from "./Header/Header";
import ArticlesList from "./Articles/ArticlesList/ArticlesList";
import ArticleCard from "./Articles/ArticleSingle/ArticleSingle";
import { ArticleTypeEnum } from "./Articles/ArticleTypeEnum";
import { CountriesEnum } from "./Service/CountriesEnum";
import { getArticles } from "./Service/Service";

type MyProps = unknown;
type MyState = {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  category: string;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);
    this.state = {
      isLoading: true,
      articles: [],
      articleSingle: null,
      countryCode: CountriesEnum.GB,
      countryDisabled: false,
      category: "",
    };
  }

  componentDidMount(): void {
    getArticles(null, null).then((it) => {
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
        isLoading: false,
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

    const handleEventCountry = (country: CountriesEnum): void => {
      getArticles(country, null).then((it) => {
        this.setState({
          isLoading: false,
          articles: it,
          countryCode: country,
        });
      });
    };

    return (
      <div className="App">
        <Header
          country={this.state.countryCode}
          countryDisabled={this.state.countryDisabled}
          onTopNewsEvent={handleEventBack}
          onCountryEvent={handleEventCountry}
        />

        <Container className="container-main">
          {this.state.articleSingle == null ? (
            <ArticlesList
              articles={this.state.articles}
              onArticleMoreEvent={handleEventSingle}
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
