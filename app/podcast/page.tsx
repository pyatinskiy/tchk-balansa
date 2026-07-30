import Link from "next/link";
import { getPodcastEpisodes } from "../lib/rss";
import PodcastCards from "./PodcastCards";


function shuffleEpisodes(items: any[]) {
  return [...items].sort(() => Math.random() - 0.5);
}


export default async function Podcast() {


  const episodes =
    await getPodcastEpisodes();


  const randomEpisodes =
    shuffleEpisodes(episodes).slice(0, 7);



  return (

    <main className="min-h-screen bg-white text-black px-6 py-16">


      <div className="max-w-5xl mx-auto">


        <Link
          href="/"
          className="
          text-zinc-500
          hover:text-black
          transition
          "
        >
          ← На главную
        </Link>



        <h1 className="mt-12 text-6xl font-bold tracking-tight">
          Подкаст
        </h1>


        <p className="mt-6 text-xl text-zinc-600">
          Бухгалтерия. Финансы. Технологии.
        </p>



        <p className="mt-4 text-lg text-zinc-500">
          Разговоры с людьми, которые меняют бухгалтерию,
          финансы и бизнес.
        </p>



        <div className="mt-16">


          <PodcastCards
            episodes={randomEpisodes}
          />


        </div>



      </div>


    </main>

  );

}