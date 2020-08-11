import React, { ReactElement } from "react";
import "./App.scss";

import Container from "react-bootstrap/Container";

import { ArticleInterface } from "./Articles/article-interface";

import Header from "./Header/Header";
import { getArticles } from "./service/service";
import ArticlesList from "./Articles/ArticlesList/ArticlesList";
import ArticleCard from "./Articles/ArticleSingle/ArticleSingle";
import { ArticleTypeEnum } from "./Articles/ArticleTypeEnum";

type MyProps = unknown;
type MyState = {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);
    this.state = {
      isLoading: true,
      articles: [],
      articleSingle: null,
    };
  }

  componentDidMount(): void {
    getArticles().then((it) => {
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
      });
    };

    const handleEventBack = (): void => {
      this.setState({
        articleSingle: null,
      });
    };

    return (
      <div className="App">
        <Header />

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
