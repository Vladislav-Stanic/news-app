import React, { ReactElement } from 'react';
import './App.scss';

import Header from './Components/Header/Header';

import { CountriesEnum } from './Service/CountriesEnum';
import { country_code, api_key } from './Service/Config';
import { CategoriesItem } from './Components/Main/Categories/CategoriesItem';
import { NavPagesEnum } from './Service/NavPagesEnum';
import { getArticles, getArticlesPerCategory } from './Service/service';
import { ArticleInterface } from './Components/Main/Articles/ArticleInterface';

import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main/Main';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { request } from 'http';

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
  pageNumber: number;
  hasMoreOnScroll: boolean;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);

    // Extract params from url
    const historyData = createBrowserHistory();
    const pathname = historyData.location.pathname;
    const countryFromParams = pathname.split('/')[1] as CountriesEnum;
    const route = pathname.split('/').slice(2).join('/');

    // Go to the default page if no country or route
    if (
      pathname === '/' ||
      route === '' ||
      route === 'article-single' ||
      route === 'category-single' ||
      !Object.values(CountriesEnum).includes(countryFromParams)
    ) {
      historyData.push(`/${country_code}/top-news`);
    }

    this.state = {
      isLoading: true,
      articles: [],
      articleSingle: null,
      countryCode: countryFromParams,
      category: '',
      searchTerm: '',
      articlesPerCategory: [],
      results: null,
      countryDisabled: false,
      history: historyData,
      pageNumber: 1,
      hasMoreOnScroll: true,
    };

    // Aded intrceptor on request to add api key
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = api_key;
      return config;
    });

    // Interceptors response and error
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response && error.response.status === 401) {
          console.log('Error: ==== ', error.response);
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
      }
    );
  }

  // Mount (depends on parameters in url)
  componentDidMount(): void {
    const route: string = this.state.history.location.pathname
      .split('/')
      .slice(2)
      .join('/');

    switch (route) {
      case 'top-news':
        this.handleTopNews();
        break;
      case 'categories':
        this.handleCategories();
        break;
      case 'search':
        this.handleEventSearch('');
        break;
      default:
        this.setState({
          isLoading: false,
        });
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
    window.scrollTo(0, 0);

    this.setState({
      pageNumber: 1,
    });

    switch (page) {
      case NavPagesEnum.topNews:
        this.handleTopNews(this.state.countryCode, 1);
        break;
      case NavPagesEnum.categories:
        this.handleCategories();
        break;
      case NavPagesEnum.search:
        this.handleEventSearch(
          this.state.searchTerm,
          this.state.countryCode,
          1
        );
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
    window.scrollTo(0, 0);

    this.setState({
      isLoading: true,
      countryCode: countryCode,
      pageNumber: 1,
    });

    switch (route) {
      case 'top-news':
        this.handleTopNews(countryCode, 1);
        break;
      case 'categories':
        this.handleCategories();
        break;
      case 'category-single':
        this.handleEventSingleCategory(this.state.category, countryCode, 1);
        break;
      case 'search':
        this.handleEventSearch(this.state.searchTerm, countryCode, 1);
        break;
      default:
        break;
    }
  };

  // Get top news
  async handleTopNews(
    countryCode?: CountriesEnum,
    pageNumber?: number
  ): Promise<void> {
    getArticles(
      countryCode || this.state.countryCode,
      null,
      null,
      pageNumber || this.state.pageNumber
    ).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        articleSingle: null,
        category: '',
        countryDisabled: false,
        hasMoreOnScroll: it.length > 0,
      });
    });
  }

  // Get categories
  async handleCategories(): Promise<void> {
    this.setState({
      isLoading: true,
    });
    const categories = await getArticlesPerCategory(this.state.countryCode);
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
    countryCode?: CountriesEnum,
    pageNumber?: number
  ): void => {
    getArticles(
      countryCode || this.state.countryCode,
      null,
      searchTerm,
      pageNumber || this.state.pageNumber
    ).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        searchTerm: searchTerm,
        countryDisabled: false,
        hasMoreOnScroll: it.length > 0,
      });
    });
  };

  // Single category
  handleEventSingleCategory = (
    category: string,
    countryCode?: CountriesEnum,
    pageNumber?: number
  ): void => {
    this.setState({
      isLoading: true,
      pageNumber: 1,
    });

    const singleCategory = category !== '' ? category : this.state.category;

    getArticles(
      countryCode || this.state.countryCode,
      singleCategory,
      null,
      pageNumber || this.state.pageNumber
    ).then((it) => {
      this.setState({
        isLoading: false,
        articles: it,
        category: singleCategory,
        countryDisabled: false,
        hasMoreOnScroll: it.length > 0,
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

  handeEventFetchMoreData = (): any => {
    const newPage = this.state.pageNumber + 1;
    const historyData = createBrowserHistory();
    const route: string = historyData.location.pathname
      .split('/')
      .slice(2)
      .join('/');

    switch (route) {
      case 'top-news':
        getArticles(this.state.countryCode, null, null, newPage).then((it) => {
          this.setState({
            articles: [...this.state.articles, ...it],
            pageNumber: newPage,
            hasMoreOnScroll: it.length > 0,
          });
        });
        break;
      case 'category-single':
        getArticles(
          this.state.countryCode,
          this.state.category,
          null,
          newPage
        ).then((it) => {
          this.setState({
            articles: [...this.state.articles, ...it],
            pageNumber: newPage,
            hasMoreOnScroll: it.length > 0,
          });
        });
        break;
      case 'search':
        getArticles(
          this.state.countryCode,
          null,
          this.state.searchTerm,
          newPage
        ).then((it) => {
          this.setState({
            articles: [...this.state.articles, ...it],
            pageNumber: newPage,
            hasMoreOnScroll: it.length > 0,
          });
        });
        break;
      default:
        this.setState({
          isLoading: false,
        });
        break;
    }
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
            onFetchMoreData={this.handeEventFetchMoreData}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
