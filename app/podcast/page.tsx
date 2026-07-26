import { getPodcastEpisodes } from "../lib/rss";

export default async function Podcast() {
  const episodes = await getPodcastEpisodes();

  return (
    <main className="min-h-screen bg-white text-black p-12">
      <h1 className="text-5xl font-semibold">
        Подкаст
      </h1>

      <pre className="mt-10 text-sm">
        {JSON.stringify(episodes.slice(0, 3), null, 2)}
      </pre>
    </main>
  );
}