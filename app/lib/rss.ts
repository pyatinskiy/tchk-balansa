import Parser from "rss-parser";

const parser = new Parser();


export type Episode = {
  title?: string;
  link?: string;
  pubDate?: string;
  summary?: string;
  audio?: string;
  image?: string;
};


function cleanHtml(text: string = "") {
  return text
    .replace(/<script[^>]*>.*?<\/script>/gis, "")
    .replace(/<style[^>]*>.*?<\/style>/gis, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}


async function generateDescription(
  title: string,
  description: string
) {

  try {

    const response = await fetch(
      "http://localhost:3000/api/ai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );


    const data = await response.json();


    return {
      description:
        data.description || description,

      highlights:
        data.highlights || [],
    };


  } catch (error) {

    console.error(
      "AI description error:",
      error
    );


    return {
      description,
      highlights: [],
    };

  }

}



export async function getPodcastEpisodes(): Promise<Episode[]> {


  const feed =
    await parser.parseURL(
      "https://podster.fm/podcasts/tchk-balansa/feed"
    );


  const episodes = await Promise.all(

    feed.items.map(
      async (item) => {


        const title =
          item.title || "";


        const rawDescription =
          item.content ||
          item.contentSnippet ||
          item.summary ||
          "";


        const cleanDescription =
          cleanHtml(rawDescription);



        const ai =
          await generateDescription(
            title,
            cleanDescription
          );



        return {

          // ВАЖНО:
          // название выпуска НЕ меняем

          title,


          link:
            item.link || "",


          pubDate:
            item.pubDate || "",


          summary:
            ai.description,


          highlights:
            ai.highlights,


          audio:
            item.enclosure?.url || "",


          image:
            // @ts-ignore
            item.itunes?.image ||
            "",

        };

      }
    )

  );


  return episodes;

}