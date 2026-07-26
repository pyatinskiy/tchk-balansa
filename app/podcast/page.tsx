import { getPodcastEpisodes } from "../lib/rss";

export default async function Podcast() {
  const episodes = await getPodcastEpisodes();

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-bold tracking-tight">
          Подкаст
        </h1>

        <p className="mt-6 text-xl text-zinc-600">
          Бухгалтерия. Финансы. Технологии.
        </p>

        <div className="mt-16 grid gap-8">

          {episodes.slice(0, 6).map((episode: any) => (

            <article
              key={episode.guid}
              className="
                border border-zinc-200 
                rounded-3xl 
                p-8
                hover:border-orange-400
                transition
              "
            >

              <div className="flex flex-col gap-5">

                <div>
                  <p className="text-sm text-zinc-400">
                    {episode.pubDate}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold">
                    {episode.title}
                  </h2>
                </div>


                <p className="text-zinc-600 leading-7">
                  {episode.contentSnippet?.slice(0, 250)}...
                </p>


                <div className="flex items-center gap-4">

                  <audio
                    controls
                    className="w-full"
                  >
                    <source
                      src={episode.enclosure.url}
                      type="audio/mpeg"
                    />
                  </audio>

                </div>


                <a
                  href={episode.link}
                  target="_blank"
                  className="
                    text-sm
                    text-orange-500
                    hover:underline
                  "
                >
                  Открыть выпуск на Podster →
                </a>


              </div>

            </article>

          ))}

        </div>

      </div>

    </main>
  );
}