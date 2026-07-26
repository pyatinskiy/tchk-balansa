import { getPodcastEpisodes } from "../lib/rss";
import PodcastCards from "./PodcastCards";

export default async function Podcast() {
  const episodes = await getPodcastEpisodes();

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-bold tracking-tight">
          Подкаст
        </h1>

        <p className="mt-6 text-xl text-zinc-600">
          Бухгалтерия. Финансы. Технологии.
        </p>

       <PodcastCards
  episodes={episodes.slice(0, 6).map((episode) => ({
    title: episode.title,
    link: episode.link,
    pubDate: episode.pubDate,
    summary: episode.itunes?.summary || "",
    audio: episode.enclosure?.url || "",
    image: episode.itunes?.image || "",
  }))}
/>

      </div>

    </main>
  );
}