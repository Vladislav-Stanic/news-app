import { ArticleInterface } from "../Articles/ArticleInterface";

export interface CategoriesItem {
  name: string;
  articles: ArticleInterface[];
  hidden?: boolean;
}
