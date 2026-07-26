import Parser from "rss-parser";

const RSS_URL = "https://podster.fm/rss.xml?pid=91601";

const parser = new Parser();

export async function getPodcastEpisodes() {
  const feed = await parser.parseURL(RSS_URL);

  return feed.items;
}