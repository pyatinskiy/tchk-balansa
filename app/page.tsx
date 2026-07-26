export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-7xl font-bold tracking-tight">
  тчк<span className="text-orange-500">.</span> баланса
</h1>

        <p className="mt-8 text-2xl text-zinc-600">
          Бухгалтерия. Финансы. Технологии.
        </p>

        <p className="mt-6 text-lg text-zinc-500">
          Подкаст, курсы и практические разборы для тех,
          кто работает с цифрами.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="#"
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800"
          >
            ▶ Слушать подкаст
          </a>

          <a
            href="#"
            className="rounded-full border border-zinc-300 px-6 py-3 hover:bg-zinc-50"
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

<section className="mt-32 max-w-2xl text-center">
  <p className="text-xl leading-8 text-zinc-500">
    тчк. баланса — это место,
    <br />
    где идеи превращаются в решения.
  </p>
</section>
      </div>
    </main>
  );
}