import { articlesUrl, country_code, category, api_key } from "./Config";
import { ArticleInterface } from "../Articles/ArticleInterface";
import { CountriesEnum } from "./CountriesEnum";

export async function getArticles(
  countryCodePar: CountriesEnum | null,
  categoryPar: string | null,
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
    const url = searchTerm == null ? urlBase : `${urlBase}&q=${searchTerm}`;

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
