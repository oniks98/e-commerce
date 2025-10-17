export interface IArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
  body: {
    p1: string;
    h2: string;
    list: string[];
    p2: string;
  };
}
