const RSS_URL = "https://podster.fm/rss.xml?pid=91601";

export async function getPodcastEpisodes() {
  const response = await fetch(RSS_URL);

  const xml = await response.text();

  return xml;
}