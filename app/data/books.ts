export type Book = {
  id: number;
  volume: number;
  title: string;
  subtitle: string;
  status: "published" | "coming";
  url?: string;
};

export const books: Book[] = [
  {
    id: 1,
    volume: 1,
    title: "Счета и двойная запись",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "published",
    url: "https://stepik.org/course/234088",
  },
  {
    id: 2,
    volume: 2,
    title: "Документы и регистры",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "published",
    url: "https://stepik.org/course/235679",
  },
  {
    id: 3,
    volume: 3,
    title: "Деньги",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 4,
    volume: 4,
    title: "ОС и НМА",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 5,
    volume: 5,
    title: "Запасы",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 6,
    volume: 6,
    title: "Зарплата",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 7,
    volume: 7,
    title: "Капитал и обязательства",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 8,
    volume: 8,
    title: "Доходы и расходы",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 9,
    volume: 9,
    title: "Отчетность",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
  {
    id: 10,
    volume: 10,
    title: "Профессиональная этика",
    subtitle: "Бухгалтерская энциклопедия в 10 томах",
    status: "coming",
  },
];