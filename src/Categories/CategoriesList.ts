import { CategoriesEnum } from "./CategoriesEnum";
import { ArticleInterface } from "../Articles/ArticleInterface";

export interface CategoriesList {
  name: CategoriesEnum;
  articles: ArticleInterface[];
}
