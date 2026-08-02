"use client";

import { Book } from "@/app/data/books";

type BookShelfProps = {
  books: Book[];
};

export default function BookShelf({ books }: BookShelfProps) {
  return (
    <section className="mt-20 w-full">

      <div
        className="
          flex
          items-end
          gap-3
          overflow-x-auto
          pb-6
          pt-6
        "
      >
        {books.map((book) => {

          const published = book.status === "published";

          const Spine = (
            <div
              className={`
                relative
                flex
                h-[420px]
                w-20
                flex-col
                justify-between
                rounded-t-xl
                border
                border-zinc-300
                bg-white
                px-3
                py-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-3
                hover:shadow-xl
                ${published ? "cursor-pointer" : "opacity-60"}
              `}
            >

              {/* Оранжевая точка */}
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500" />

              {/* Номер тома */}
              <div
                className="
                  text-xs
                  font-semibold
                  tracking-[0.25em]
                  text-zinc-400
                "
              >
                ТОМ {book.volume}
              </div>

              {/* Вертикальное название */}
              <div
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    rotate-180
                    text-center
                    text-sm
                    font-medium
                    leading-6
                    [writing-mode:vertical-rl]
                  "
                >
                  {book.title}
                </div>
              </div>

              {/* Статус */}
              <div className="text-center text-xs text-zinc-400">
                {published ? "Открыть" : "Скоро"}
              </div>

            </div>
          );

          if (published && book.url) {
            return (
              <a
                key={book.id}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Spine}
              </a>
            );
          }

          return (
            <div key={book.id}>
              {Spine}
            </div>
          );

        })}
      </div>

      {/* Полка */}

      <div
        className="
          h-3
          w-full
          rounded-full
          bg-zinc-200
        "
      />

    </section>
  );
}