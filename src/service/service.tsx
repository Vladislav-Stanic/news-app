import { articlesUrl, country_code, category, api_key } from "../config/config";
import { ArticleInterface } from "../Articles/article-interface";

export async function getArticles(
  countryCodePar: string | null,
  categoryPar: string | null
): Promise<ArticleInterface[]> {
  if (countryCodePar == null) {
    countryCodePar = country_code;
  }

  if (categoryPar == null) {
    categoryPar = category;
  }

  try {
    const articles: Response = await fetch(
      `${articlesUrl}?country=${countryCodePar}&category=${categoryPar}`,
      {
        headers: {
          "X-API-KEY": api_key,
        },
      }
    );

    const result = await articles.json();
    // articles = null;

    return result.articles;
  } catch {
    console.log("Error on request");
    return [];
  }
}
