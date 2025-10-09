export interface Article {
  id: string;
  image: string;
  title: string;
  text: string;
  link: string;
}

export const articlesData: Article[] = [
  {
    id: '1',
    image: 'v1721922994/ONYX-STORE/articles/article-1_b3qctj.png',
    title: 'Нова колекція вже тут!',
    text: 'Ознайомтеся з останніми трендами та оновіть свій гардероб.',
    link: '/promotions/new-collection',
  },
  {
    id: '2',
    image: 'v1721922994/ONYX-STORE/articles/article-2_k9vxts.png',
    title: 'Знижки до -50%!',
    text: 'Не пропустіть великий розпродаж літньої колекції.',
    link: '/promotions/summer-sale',
  },
  {
    id: '3',
    image: 'v1721922994/ONYX-STORE/articles/article-3_pzg6pw.png',
    title: 'Безкоштовна доставка',
    text: 'Робіть замовлення на суму від 1000 грн та отримуйте безкоштовну доставку.',
    link: '/terms',
  },
  {
    id: '4',
    image: 'v1721922994/ONYX-STORE/articles/article-1_b3qctj.png',
    title: 'Нова колекція вже тут!',
    text: 'Ознайомтеся з останніми трендами та оновіть свій гардероб.',
    link: '/promotions/new-collection',
  },
  {
    id: '5',
    image: 'v1721922994/ONYX-STORE/articles/article-2_k9vxts.png',
    title: 'Знижки до -50%!',
    text: 'Не пропустіть великий розпродаж літньої колекції.',
    link: '/promotions/summer-sale',
  },
  {
    id: '6',
    image: 'v1721922994/ONYX-STORE/articles/article-3_pzg6pw.png',
    title: 'Безкоштовна доставка',
    text: 'Робіть замовлення на суму від 1000 грн та отримуйте безкоштовну доставку.',
    link: '/terms',
  },
];
