import { articlesUrl, country_code, category, api_key } from "../config/config";
import { ArticleInterface } from "../Articles/article-interface";

export async function getArticles(): Promise<ArticleInterface[]> {
  try {
    const articles: Response = await fetch(
      `${articlesUrl}?country=${country_code}&category=${category}`,
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
