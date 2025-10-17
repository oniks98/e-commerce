import { IArticle } from '@/lib/shop/types/article';

type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

interface IBlogData {
  articles: IArticle[];
  breadcrumbs: BreadcrumbItem[];
}

export const blogData: IBlogData = {
  articles: [
    {
      id: 1,
      title: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      date: '2024-10-10',
      image:
        'https://res.cloudinary.com/dciy4bfhd/image/upload/v1721390958/vlnrf3na3rp1n3y2kivl.webp',
      slug: 'oformlennya-vitalni-yaki-myaki-mebli-krashche-vybraty',
      body: {
        p1: "Вітальня – це основна кімната у кожному будинку. Саме вона служить для прийому гостей, проведення часу всією сім'єю та просто для відпочинку у приємній теплій атмосфері. Оформляючи свій будинок та вітальню зокрема, всі намагаються зробити її максимально зручною, комфортною та красивою. Основним та центральним елементом оформлення вітальні, як і будь-якої іншої кімнати, є м'які меблі. Будь-які меблі для вітальні повинні бути не тільки стильними і красивими, але і функціональними. На таких меблів має бути зручно та приємно відпочивати та приймати гостей. Однак сьогодні існує величезна різноманітність найрізноманітніших м'яких меблів для вітальні, яка підходить для кімнат різних розмірів і форм. На чому варто зупинити свій вибір? Як краще оформити свою вітальню, щоб вам було комфортно, а гості хотіли приходити до вас знову та знову?",
        h2: "На сайті інтернет магазину Кровато представлено велику різноманітність м'яких меблів для вітальні, серед яких кожен зможе вибрати для себе найбільш вдалий варіант. У нас ви знайдете:",
        list: [
          'Прямі дивани. Такі дивани вважаються класикою. Вони підходять для віталень будь-яких форм та розмірів. Прямий диван виглядає стильно та лаконічно, на ньому зручно відпочивати, приймати гостей або навіть спати. Прямі дивани можуть стояти біля стіни, так і в центрі кімнати. Багато моделей прямих диванів легко розкладаються, перетворюючись на повноцінне спальне місце. Також більшість диванів мають великі та місткі ніші, які є додатковим місцем для зберігання;',
          "Кутові дивани Кутові дивани вважаються найзручнішими та комфортнішими. Вони ідеально підійдуть для приємного проведення часу в колі сім'ї або друзів. Кутові дивани в основному використовуються для оформлення великих віталень, так як вони займають багато місця, і для кімнат з невеликою площею просто не підійдуть;",
          "Тахти. Тахта - це одна з варіацій дивана, але стильніша і мінімалістична. Виглядають тахти дуже незвично і можуть підійти для будь-якого інтер'єру. Також тахти більше ніж звичайні дивани підходять для сну, оскільки в їх основі не пружинні блоки, а дерев'яні ламелі або ортопедичні матраци;",
          "Крісла. Крісло – це особливий предмет інтер'єру. Сучасні дизайнери не часто використовують його, вважаючи застарілим, проте саме крісла створюють особливий затишок та комфорт у будь-якій кімнаті. Сьогодні існує величезна різноманітність класичних та сучасних моделей крісел, що дозволяє кожному відшукати ідеальне крісло для свого будинку;",
          "Набір меблів. Комплект м'яких меблів – це відмінне рішення для тих, хто хоче меблювати свою вітальню не лише диваном, а й кріслами. Існують набори з одним або двома кріслами, із прямими або кутовими диванами. Основна перевага будь-якого готового меблевого гарнітура – це те, що предмети меблів у ньому ідеально поєднуються один з одним, і вам не потрібно буде витрачати свій час та сили на їхній підбір.",
        ],
        p2: "Підбір м'яких меблів для вітальні – це заняття непросте. Однак при виборі та покупці меблів для своєї вітальні пам'ятайте, що якісні м'які меблі повинні бути не тільки красивими, але й зручними для вас і всіх мешканців вашого будинку.",
      },
    },
    {
      id: 2,
      title: 'Що краще вибрати для кухні – стільці чи кухонний куточок?',
      date: '2024-09-25',
      image:
        'https://res.cloudinary.com/demo/image/upload/v1629289292/blog2.jpg',
      slug: 'shcho-krashche-vybraty-dlya-kukhni-stiltsi-chy-kukhonnyi-kutochok',
      body: {
        p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        h2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
        list: [
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
        ],
        p2: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
      },
    },
    {
      id: 3,
      title: 'Стільці для вітальні. Як правильно вибрати?',
      date: '2024-10-15',
      image:
        'https://res.cloudinary.com/demo/image/upload/v1629289292/blog3.jpg',
      slug: 'stiltsi-dlya-vitalni-yak-pravylno-vybraty',
      body: {
        p1: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        h2: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.',
        list: [
          'Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        ],
        p2: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
      },
    },
    {
      id: 4,
      title: 'Lorem Ipsum Dolor Sit Amet',
      date: '2024-10-20',
      image:
        'https://res.cloudinary.com/dciy4bfhd/image/upload/v1721390958/vlnrf3na3rp1n3y2kivl.webp',
      slug: 'lorem-ipsum-dolor-sit-amet',
      body: {
        p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        h2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
        list: [
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
        ],
        p2: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
      },
    },
    {
      id: 5,
      title: 'Consectetur Adipiscing Elit',
      date: '2024-10-22',
      image:
        'https://res.cloudinary.com/dciy4bfhd/image/upload/v1721390958/vlnrf3na3rp1n3y2kivl.webp',
      slug: 'consectetur-adipiscing-el',
      body: {
        p1: 'Consectetur',
        h2: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.',
        list: [
          'Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          'Quis autem?',
        ],
        p2: 'Et harum',
      },
    },
  ],
  breadcrumbs: [
    {
      label: 'Головна',
      href: '/',
    },
    {
      label: 'Блог',
      href: '/blog',
    },
    {
      label: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      href: '/blog/[article]',
    },
  ],
};
