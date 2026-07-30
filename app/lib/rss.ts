import Parser from "rss-parser";

const parser = new Parser();


const RSS_URL =
  "https://podster.fm/rss.xml?pid=91601";


export type Episode = {

  title: string;

  link: string;

  pubDate: string;

  audio: string;

  image: string;

  summary: string;

  aiDescription?: string;

  highlights?: string[];

};



function cleanHtml(text: string = "") {

  return text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

}



export async function getPodcastEpisodes()
: Promise<Episode[]> {


  const feed =
    await parser.parseURL(RSS_URL);



  const episodes =
    feed.items.map((item) => {


      return {


        // ===== RSS ДАННЫЕ =====

        title:
          item.title || "Без названия",


        link:
          item.link || "",


        pubDate:
          item.pubDate || "",


        audio:
          item.enclosure?.url || "",


        image:
          item.itunes?.image || "",



        // оставляем только на случай отладки

        summary:
          cleanHtml(
            item.itunes?.summary ||
            item.content ||
            ""
          ),


        // AI пока отключаем
        // чтобы страница не зависала

        aiDescription:
          "",


        highlights:
          [],


      };

    });



  return episodes;

}