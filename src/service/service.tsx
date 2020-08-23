import {
  articlesTopHeadlinesUrl,
  country_code,
  category,
  api_key,
} from './Config';
import { ArticleInterface } from '../Components/Main/Articles/ArticleInterface';
import { CountriesEnum } from './CountriesEnum';

export async function getArticles(
  countryCodePar: CountriesEnum | null,
  categoryPar: string | null,
  searchTerm: string | null,
  pageNumber: number
): Promise<ArticleInterface[]> {
  if (countryCodePar == null) {
    countryCodePar = country_code;
  }

  if (categoryPar == null) {
    categoryPar = category;
  }

  const page: string = pageNumber.toString();

  try {
    const urlBase = `${articlesTopHeadlinesUrl}?country=${countryCodePar}`;
    let url = urlBase;

    if (searchTerm != null) {
      url = `${urlBase}&q=${searchTerm}&page=${page}`;
    } else if (categoryPar != null) {
      url = `${urlBase}&category=${categoryPar}&page=${page}`;
    }

    // console.log("url ======== ", url);

    const articles: Response = await fetch(url, {
      headers: {
        'X-API-KEY': api_key,
      },
    });

    const result = await articles.json();
    return result.articles;
  } catch {
    console.log('Error on request!');
    return [];
  }
}

export async function getArticlesPerCategory(
  countryCodePar: CountriesEnum
): Promise<any[]> {
  const urlBase = `${articlesTopHeadlinesUrl}?country=${countryCodePar}`;

  return Promise.all([
    fetch(`${urlBase}&category=business&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=entertainment&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=general&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=health&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=science&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=sports&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
    fetch(`${urlBase}&category=technology&pageSize=5`, {
      headers: {
        'X-API-KEY': api_key,
      },
    }),
  ])
    .then(([res1, res2, res3, res4, res5, res6, res7]) =>
      Promise.all([
        res1.json(),
        res2.json(),
        res3.json(),
        res4.json(),
        res5.json(),
        res6.json(),
        res7.json(),
      ])
    )
    .then((result) => {
      return result;
    });
}
