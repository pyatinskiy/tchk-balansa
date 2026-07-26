type Episode = {
  title?: string;
  link?: string;
  pubDate?: string;
  summary?: string;
  audio?: string;
  image?: string;

  ai?: {
    title?: string;
    description?: string;
    highlights?: string[];
  };
};


function cleanHtml(text?: string) {
  if (!text) return "";

  return text
    .replace(/<script[^>]*>.*?<\/script>/gis, "")
    .replace(/<style[^>]*>.*?<\/style>/gis, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}


export default function PodcastCards({
  episodes,
}: {
  episodes: Episode[];
}) {

  return (
    <div className="mt-16 grid gap-8">

      {episodes.map((episode, index) => {


        const description =
          episode.ai?.description ||
          cleanHtml(episode.summary);


        const highlights =
          episode.ai?.highlights || [];


        return (

          <article
            key={index}
            className="
              border
              border-zinc-200
              rounded-3xl
              p-8
              hover:border-orange-400
              transition
              bg-white
            "
          >

            <div className="flex flex-col gap-6">


              {episode.image && (

                <img
                  src={episode.image}
                  alt=""
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


                {/* ВАЖНО:
                    название берем только из RSS.
                    AI его никогда не меняет.
                */}

                <h2 className="
                  mt-3
                  text-3xl
                  font-semibold
                  leading-tight
                ">
                  {episode.title}
                </h2>


              </div>



              {description && (

                <p className="
                  text-zinc-700
                  leading-8
                  text-lg
                ">
                  {description}
                </p>

              )}




              {highlights.length > 0 && (

                <div className="
                  border-l-4
                  border-orange-400
                  pl-5
                  space-y-3
                ">

                  {highlights.map((item, i) => (

                    <p
                      key={i}
                      className="
                        text-zinc-600
                      "
                    >
                      • {item}
                    </p>

                  ))}


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




              {episode.link && (

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

              )}


            </div>


          </article>

        );


      })}


    </div>
  );
}