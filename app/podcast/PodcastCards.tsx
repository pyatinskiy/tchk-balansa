type Episode = {
  title?: string;
  link?: string;
  pubDate?: string;
  audio?: string;
  image?: string;

  aiDescription?: string;

  highlights?: string[];
};


export default function PodcastCards({
  episodes,
}: {
  episodes: Episode[];
}) {


  return (

    <div className="mt-16 grid gap-10">


      {episodes.map((episode, index) => (

        <article
          key={index}
          className="
            border
            border-zinc-200
            rounded-3xl
            p-8
            hover:border-orange-400
            transition
          "
        >


          <div className="flex flex-col gap-6">



            {/* Обложка из RSS */}

            {episode.image && (

              <img
                src={episode.image}
                alt={episode.title || ""}
                className="
                  w-40
                  h-40
                  rounded-2xl
                  object-cover
                "
              />

            )}



            {/* Дата */}

            <p className="text-sm text-zinc-400">

              {episode.pubDate}

            </p>




            {/* Название из RSS */}

            <h2
              className="
                text-3xl
                font-semibold
                tracking-tight
              "
            >

              {episode.title}

            </h2>





            {/* AI описание */}

            {episode.aiDescription && (

              <p
                className="
                  text-lg
                  leading-8
                  text-zinc-700
                "
              >

                {episode.aiDescription}

              </p>

            )}






            {/* AI тезисы */}

            {episode.highlights &&
              episode.highlights.length > 0 && (

              <ul
                className="
                  mt-2
                  space-y-3
                  text-zinc-600
                "
              >

                {episode.highlights.map(
                  (item, i) => (

                    <li
                      key={i}
                      className="
                        flex
                        gap-3
                      "
                    >

                      <span className="text-orange-500">
                        •
                      </span>

                      <span>
                        {item}
                      </span>

                    </li>

                  )
                )}

              </ul>

            )}






            {/* Плеер из RSS */}

            {episode.audio && (

              <audio
                controls
                className="w-full mt-4"
              >

                <source
                  src={episode.audio}
                  type="audio/mpeg"
                />

              </audio>

            )}







            {/* Ссылка на Podster из RSS */}

            {episode.link && (

              <a
                href={episode.link}
                target="_blank"
                className="
                  text-orange-500
                  hover:underline
                  text-sm
                "
              >

                Открыть выпуск на Podster →

              </a>

            )}



          </div>


        </article>


      ))}


    </div>

  );

}