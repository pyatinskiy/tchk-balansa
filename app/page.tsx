"use client";

import { useState } from "react";
import PodcastPlayer from "@/components/PodcastPlayer";
import type { Episode } from "@/app/lib/rss";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [latestEpisode, setLatestEpisode] = useState<Episode | null>(null);

  async function openPlayer() {
    setPlayerOpen(true);

    if (latestEpisode) return;

    setLoadingPlayer(true);

    try {
      const response = await fetch("/api/latest-episode");
      const episode = await response.json();
      setLatestEpisode(episode);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlayer(false);
    }
  }

  function closePlayer() {
    setPlayerOpen(false);
  }

  return (
    <main className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-8 left-8 text-2xl hover:opacity-60 transition"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-12">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 left-8 text-2xl hover:opacity-60 transition"
          >
            ✕
          </button>

          <nav className="mt-24 flex flex-col gap-10">
            <a href="/podcast" className="group">
              <span className="text-sm text-zinc-400">01</span>
              <div className="text-5xl font-semibold group-hover:text-orange-500 transition">
                Подкаст
              </div>
            </a>

            <a href="/courses" className="group">
              <span className="text-sm text-zinc-400">02</span>
              <div className="text-5xl font-semibold group-hover:text-orange-500 transition">
                Курсы
              </div>
            </a>

            <a href="/blog" className="group">
              <span className="text-sm text-zinc-400">03</span>
              <div className="text-5xl font-semibold group-hover:text-orange-500 transition">
                Блог
              </div>
            </a>

            <a href="/about" className="group">
              <span className="text-sm text-zinc-400">04</span>
              <div className="text-5xl font-semibold group-hover:text-orange-500 transition">
                О проекте
              </div>
            </a>
          </nav>
        </div>
      )}

      <div className="max-w-3xl text-center">
        <h1 className="text-7xl font-bold tracking-tight">
          тчк<span className="text-orange-500">.</span> баланса
        </h1>

        <p className="mt-8 text-2xl text-zinc-600">
          Бухгалтерия. Финансы. Технологии.
        </p>

        <p className="mt-6 text-lg text-zinc-500">
          Подкаст, курсы и практические разборы для тех,
          <br />
          кто работает с цифрами.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button
            onClick={openPlayer}
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800 transition"
          >
            ▶ Слушать подкаст
          </button>

          <a
            href="/courses"
            className="rounded-full border border-zinc-300 px-6 py-3 hover:bg-zinc-50 transition"
          >
            Курсы
          </a>
        </div>

        <section className="mt-32 max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            За каждой цифрой есть история.
          </h2>

          <p className="mt-8 text-xl leading-8 text-zinc-600">
            Решения. Люди. Будущее.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-500">
            Финансы меняются.
            <br />
            Мы разбираемся, почему.
          </p>
        </section>
      </div>

      {playerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={closePlayer}
          />

          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,640px)] z-50">
            {loadingPlayer && (
              <div className="rounded-3xl border border-zinc-200 bg-white px-8 py-6 shadow-2xl">
                <span className="text-orange-500">●</span> готовим последний выпуск...
              </div>
            )}

            {latestEpisode && (
              <PodcastPlayer
                episode={latestEpisode}
                onClose={closePlayer}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
}