import Parser from "rss-parser";


const parser = new Parser({

  customFields: {
    item: [
      ["itunes:image", "itunesImage"],
      ["itunes:summary", "itunesSummary"],
      ["enclosure", "enclosure"],
    ],
  },

});


export async function getPodcastEpisodes() {


  const feedUrl = "https://podster.fm/rss.xml?pid=91601";


  const feed = await parser.parseURL(feedUrl);


  return feed.items.map((item) => ({


    title: item.title || "",


    link: item.link || "",


    pubDate: item.pubDate || "",


    summary:
      item.itunesSummary ||
      item.contentSnippet ||
      item.content ||
      "",


    audio:
      item.enclosure?.url ||
      "",


    image:
      item.itunesImage?.href ||
      item.itunesImage ||
      "",


  }));

}