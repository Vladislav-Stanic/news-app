import React, { ReactElement } from "react";
import "./App.scss";

import Header from "./Components/Header/Header";

import { CountriesEnum } from "./Service/CountriesEnum";
import { country_code, CategoriesList } from "./Service/Config";
import { CategoriesItem } from "./Components/Main/Categories/CategoriesItem";
import { NavPagesEnum } from "./Service/NavPagesEnum";
import { getArticles } from "./Service/Service";
import { ArticleInterface } from "./Components/Main/Articles/ArticleInterface";

import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main/Main";
import createHistory from "history/createBrowserHistory";

type MyProps = unknown;
type MyState = {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  category: string;
  searchTerm: string;
  articlesPerCategory: CategoriesItem[];
  results: string | null;
  history: any;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);

    // Extract params from url
    const history = createHistory();
    const pathname = history.location.pathname;
    const countryFromParams = pathname.split("/")[1] as CountriesEnum;
    const route = pathname.split("/").slice(2).join("/");

    // Go to the default page if no country or route
    if (
      pathname === "/" ||
      route === "" ||
      route === "articleSingle" ||
      route === "categorySingle" ||
      !Object.values(CountriesEnum).includes(countryFromParams)
    ) {
      history.push(`/${country_code}/topNews`);
    }

    this.state = {
      isLoading: true,
      articles: [],
      articleSingle: null,
      countryCode: countryFromParams,
      category: "",
      searchTerm: "",
      articlesPerCategory: [],
      results: null,
      countryDisabled: false,
      history: history,
    };
  }

  // Mount (depends on parameters in url)
  componentDidMount(): void {
    const route: string = this.state.history.location.pathname
      .split("/")
      .slice(2)
      .join("/");

    switch (route) {
      case "topNews":
        this.handleTopNews();
        break;
      case "categories":
        this.handleCategories();
        break;
      case "search":
        this.handleEventSearch("");
        break;
      default:
        break;
    }
  }

  // Navigate to single article
  handleEventSingle = (article: ArticleInterface): void => {
    this.setState({
      isLoading: false,
      articleSingle: article,
      countryDisabled: true,
    });
  };

  // Go back from single article
  handleEventBack = (): void => {
    this.setState({
      articleSingle: null,
      countryDisabled: false,
    });

    this.state.history.goBack();
  };

  // Navigate to a page
  handleEventPage = async (page: NavPagesEnum): Promise<void> => {
    switch (page) {
      case NavPagesEnum.topNews:
        this.handleTopNews();
        break;
      case NavPagesEnum.categories:
        this.handleCategories();
        break;
      case NavPagesEnum.search:
        this.handleEventSearch(this.state.searchTerm);
        break;
      default:
        break;
    }
  };

  // Change country
  handleEventCountry = async (
    countryCode: CountriesEnum,
    route: string
  ): Promise<void> => {
    this.setState({
      isLoading: true,
      countryCode: countryCode,
    });

    // const route: string = this.state.history.location.pathname
    //   .split("/")
    //   .slice(2)
    //   .join("/");
    // console.log("route ==== ", route);

    switch (route) {
      case "topNews":
        this.handleTopNews(countryCode);
        break;
      case "categories":
        this.handleCategories();
        break;
      case "categorySingle":
        console.log("this.state.category === ", this.state.category);
        console.log("countryCode === ", countryCode);
        this.handleEventSingleCategory(this.state.category, countryCode);
        break;
      case "search":
        this.handleEventSearch(this.state.searchTerm, countryCode);
        break;
      default:
        break;
    }
  };

  // Get top news
  async handleTopNews(countryCode?: CountriesEnum): Promise<void> {
    getArticles(countryCode || this.state.countryCode, null, null, null).then(
      (it) => {
        this.setState({
          isLoading: false,
          articles: it,
          articleSingle: null,
          category: "",
          countryDisabled: false,
        });
      }
    );
  }

  // Get categories
  async handleCategories(): Promise<void> {
    this.setState({
      isLoading: true,
    });
    const categories: CategoriesItem[] = [];
    for (const item of CategoriesList) {
      categories.push({
        name: item,
        articles: await getArticles(this.state.countryCode, item, "5", null),
        hidden: true,
      });
    }
    this.setState({
      isLoading: false,
      articleSingle: null,
      articlesPerCategory: categories,
      countryDisabled: false,
    });
  }

  // Enter search term
  handleEventSearch = (
    searchTerm: string,
    countryCode?: CountriesEnum
  ): void => {
    getArticles(
      countryCode || this.state.countryCode,
      null,
      null,
      searchTerm
    ).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        searchTerm: searchTerm,
        countryDisabled: false,
      });
    });
  };

  // Single category
  handleEventSingleCategory = (
    category: string,
    countryCode?: CountriesEnum
  ): void => {
    this.setState({
      isLoading: true,
    });

    const singleCategory = category !== "" ? category : this.state.category;

    getArticles(
      countryCode || this.state.countryCode,
      singleCategory,
      null,
      null
    ).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        category: singleCategory,
        countryDisabled: false,
      });
    });
  };

  // Toggle categories
  handleEventToggle = (index: number): void => {
    const articlesPerCategory: CategoriesItem[] = [
      ...this.state.articlesPerCategory,
    ];
    const toggleCategory = this.state.articlesPerCategory[index];
    toggleCategory.hidden = !toggleCategory.hidden;

    this.setState({
      articlesPerCategory: articlesPerCategory,
    });
  };

  render(): ReactElement {
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            countryCode={this.state.countryCode}
            countryDisabled={this.state.countryDisabled}
            onPageEvent={this.handleEventPage}
            onCountryEvent={this.handleEventCountry}
          />
          <Main
            {...this.state}
            onArticleMoreEvent={this.handleEventSingle}
            onSearchEvent={this.handleEventSearch}
            onArticleBackEvent={this.handleEventBack}
            onSingleCategory={this.handleEventSingleCategory}
            onToggleCategory={this.handleEventToggle}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
