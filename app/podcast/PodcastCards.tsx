type Episode = {
  title?: string;
  link?: string;
  pubDate?: string;
  summary?: string;
  audio?: string;
  image?: string;
};


async function generateAI(episode: Episode) {

  const response = await fetch(
    "http://localhost:3000/api/ai",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: episode.title,
        description: episode.summary,
      }),

      cache: "no-store",
    }
  );


  if (!response.ok) {
    return null;
  }


  return await response.json();

}



export default async function PodcastCards({
  episodes,
}: {
  episodes: Episode[];
}) {


  const cards = await Promise.all(
    episodes.map(async (episode) => ({
      episode,
      ai: await generateAI(episode),
    }))
  );


  return (
    <div className="mt-16 grid gap-8">


      {cards.map(({ episode, ai }, index) => (


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
                {ai?.title || episode.title}
              </h2>

            </div>



            <p className="text-zinc-600 leading-7">
              {ai?.intro || episode.summary}
            </p>



            {ai?.keyPoints && (

              <div>

                <h3 className="font-semibold text-xl mb-3">
                  Главное:
                </h3>


                <ul className="space-y-2 text-zinc-600">

                  {ai.keyPoints.map(
                    (point: string, i: number) => (

                    <li key={i}>
                      • {point}
                    </li>

                  ))}

                </ul>

              </div>

            )}



            {ai?.audience && (

              <div
                className="
                  bg-zinc-50
                  rounded-2xl
                  p-5
                "
              >

                <p className="text-sm text-zinc-400">
                  Кому полезно
                </p>


                <p className="mt-2">
                  {ai.audience}
                </p>

              </div>

            )}




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