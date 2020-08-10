export interface ArticleInterface {
  author: string;
  content: string | null;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string | null;
}
