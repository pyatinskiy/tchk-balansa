import { getPodcastEpisodes } from "../lib/rss";

export default async function Podcast() {
  const episodes = await getPodcastEpisodes();

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-bold tracking-tight">
          тчк<span className="text-orange-500">.</span> баланса
        </h1>

        <p className="mt-6 text-2xl text-zinc-600">
          Подкаст о бухгалтерии, финансах и технологиях.
        </p>


        <section className="mt-20 grid gap-8">

          {episodes.slice(0, 10).map((episode: any) => (

            <article
              key={episode.guid}
              className="border border-zinc-200 rounded-3xl p-8 hover:shadow-lg transition"
            >

              <div className="flex flex-col gap-6">

                <div>
                  <p className="text-sm text-zinc-400">
                    {new Date(
                      episode.pubDate
                    ).toLocaleDateString("ru-RU")}
                  </p>


                  <h2 className="mt-3 text-3xl font-semibold">
                    {episode.title}
                  </h2>
                </div>


                <p className="text-zinc-600 leading-7 line-clamp-4">
                  {episode.contentSnippet}
                </p>


                <div className="flex gap-4">

                  <a
                    href={episode.link}
                    target="_blank"
                    className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800 transition"
                  >
                    ▶ Слушать выпуск
                  </a>

                </div>

              </div>

            </article>

          ))}

        </section>

      </div>

    </main>
  );
}