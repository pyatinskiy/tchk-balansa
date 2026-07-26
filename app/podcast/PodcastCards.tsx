type Episode = {
  title?: string;
  link?: string;
  pubDate?: string;
  summary?: string;
  audio?: string;
  image?: string;
};

export default function PodcastCards({
  episodes,
}: {
  episodes: Episode[];
}) {
  return (
    <div className="mt-16 grid gap-8">

      {episodes.map((episode, index) => (

        <article
          key={index}
          className="
            border border-zinc-200
            rounded-3xl
            p-8
            hover:border-orange-400
            transition
          "
        >

          <div className="flex flex-col gap-6">

            {episode.image && (
              <img
                src={episode.image}
                alt={episode.title}
                className="
                  w-32
                  h-32
                  rounded-2xl
                  object-cover
                "
              />
            )}

            <div>

              <p className="text-sm text-zinc-400">
                {episode.pubDate}
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                {episode.title}
              </h2>

            </div>


            <p className="text-zinc-600 leading-7">
              {episode.summary
                ?.replace(/<[^>]*>/g, "")
                .slice(0, 220)}
              ...
            </p>


            {episode.audio && (
              <audio
                controls
                className="w-full"
              >
                <source
                  src={episode.audio}
                  type="audio/mpeg"
                />
              </audio>
            )}


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
  );
}