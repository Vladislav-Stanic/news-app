import {
  articlesTopHeadlinesUrl,
  country_code,
  category,
  CategoriesList,
} from './Config';
import { ArticleInterface } from '../Components/Main/Articles/ArticleInterface';
import { CountriesEnum } from './CountriesEnum';
import axios from 'axios';
import { CategoriesItem } from '../Components/Main/Categories/CategoriesItem';

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

  // try {
  const urlBase = `${articlesTopHeadlinesUrl}?country=${countryCodePar}`;
  let url = urlBase;

  if (searchTerm != null) {
    url = `${urlBase}&q=${searchTerm}&page=${page}`;
  } else if (categoryPar != null) {
    url = `${urlBase}&category=${categoryPar}&page=${page}`;
  }

  // console.log("url ======== ", url);
  return new Promise<ArticleInterface[]>((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        resolve(result.data.articles);
      })
      .catch((error) => {
        console.log('Error ', error);
        reject();
      });
  });
}

export function getArticlesPerCategory(
  countryCodePar: CountriesEnum
): Promise<CategoriesItem[]> {
  const urlBase = `${articlesTopHeadlinesUrl}?country=${countryCodePar}`;
  const requests: any = [];

  for (const item of CategoriesList) {
    const url = `${urlBase}&category=${item}&pageSize=5`;
    requests.push(axios.get(url));
  }

  return new Promise<CategoriesItem[]>((resolve, reject) => {
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          const categories: CategoriesItem[] = [];
          for (let i = 0; i < CategoriesList.length; i++) {
            categories.push({
              name: CategoriesList[i],
              articles: (responses[i] as any).data.articles,
              hidden: true,
            });
          }
          resolve(categories);
        })
      )
      .catch((error) => {
        console.log('Error ', error);
        reject();
      });
  });
}
