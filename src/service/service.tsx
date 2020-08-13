import { articlesUrl, country_code, category, api_key } from "./Config";
import { ArticleInterface } from "../Articles/ArticleInterface";
import { CountriesEnum } from "./CountriesEnum";

export async function getArticles(
  countryCodePar: CountriesEnum | null,
  categoryPar: string | null,
  resultsNumber: string | null,
  searchTerm: string | null
): Promise<ArticleInterface[]> {
  if (countryCodePar == null) {
    countryCodePar = country_code;
  }

  if (categoryPar == null) {
    categoryPar = category;
  }

  try {
    const urlBase = `${articlesUrl}?country=${countryCodePar}`;
    let url = urlBase;

    if (searchTerm != null) {
      url = `${urlBase}&q=${searchTerm}`;
    } else if (categoryPar != null) {
      if (resultsNumber == null) {
        url = `${urlBase}&category=${categoryPar}`;
      } else {
        url = `${urlBase}&category=${categoryPar}&pageSize=5`;
      }
    }

    console.log("url ======== ", url);

    const articles: Response = await fetch(url, {
      headers: {
        "X-API-KEY": api_key,
      },
    });

    const result = await articles.json();
    // articles = null;

    return result.articles;
  } catch {
    console.log("Error on request");
    return [];
  }
}
