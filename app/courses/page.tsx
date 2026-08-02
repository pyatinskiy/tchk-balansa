import BookShelf from "@/app/components/BookShelf";
import { books } from "@/app/data/books";

export default function Courses() {
  const published = books.filter(
    (book) => book.status === "published"
  ).length;

  return (
    <main className="min-h-screen bg-white text-black">

      <section className="mx-auto max-w-7xl px-8 py-24">

        <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
          Библиотека
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight">
          Бухгалтерская энциклопедия
          <br />
          <span className="text-orange-500">
            в 10 томах
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-600">
          Серия практических курсов по бухгалтерскому учету.
          Каждый том посвящен отдельной теме и может
          изучаться самостоятельно, но вместе они
          образуют единую современную энциклопедию
          бухгалтера.
        </p>

        <div className="mt-14 flex items-center gap-6">

          <div className="flex-1">

            <div className="h-2 rounded-full bg-zinc-200">

              <div
                className="h-2 rounded-full bg-orange-500 transition-all"
                style={{
                  width: `${published * 10}%`,
                }}
              />

            </div>

          </div>

          <div className="text-sm text-zinc-500 whitespace-nowrap">

            {published} из 10 опубликовано

          </div>

        </div>

        <BookShelf books={books} />

      </section>

    </main>
  );
}