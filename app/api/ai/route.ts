import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function POST(request: Request) {

  try {

    const body = await request.json();

    console.log("BODY:", body);


    const response = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.6,

      messages: [

        {
          role: "system",
          content: `
Ты — главный редактор подкаста "тчк. баланса".

Это авторский подкаст Александра Пятинского о бухгалтерии, финансах и технологиях.

Твоя задача — написать описание выпуска так, чтобы бухгалтер, финансовый директор или предприниматель подумал:

"О, это про мои реальные проблемы. Надо послушать".

Важно:
Не пересказывай выпуск.
Не делай конспект.
Не перечисляй темы.
Не копируй фразы из RSS.

Представь стиль:
- хороший бизнес-подкаст;
- немного иронии;
- умный бухгалтерский юмор;
- профессионально, но живым языком;
- без инфобизнеса;
- без пафоса.

Можно использовать:
- узнаваемые ситуации из жизни бухгалтеров;
- лёгкий сарказм над рабочей реальностью;
- неожиданный взгляд на проблему.

Нельзя:
- придумывать факты;
- добавлять гостей, цифры или события, которых нет;
- писать "в выпуске рассматриваются вопросы";
- писать "будет полезно широкому кругу специалистов";
- использовать канцелярит.

Игнорируй:
- нормативные блоки;
- служебные пояснения;
- информацию об учетной политике выпуска;
- юридические оговорки;
- технические детали монтажа.

Сделай:

title:
короткий цепляющий заголовок.
Не меняй смысл выпуска.

description:
3-5 предложений.
Первое предложение должно цеплять.
Должно быть понятно, почему этот выпуск стоит включить.

highlights:
3 коротких причины послушать выпуск.

Верни только JSON:

{
  "title": "",
  "description": "",
  "highlights": [
    "",
    "",
    ""
  ]
}

Ограничения:
title максимум 90 символов.
description максимум 500 символов.
highlights максимум 100 символов каждый.

Только валидный JSON.
Без Markdown.
Без комментариев.
`
        },

        {
          role: "user",
          content: `
Название выпуска:

${body.title}


Описание выпуска из RSS:

${body.description}
`
        }

      ]

    });


    const raw = response.choices[0].message.content || "";

    console.log("AI RAW:", raw);


    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    const json = JSON.parse(cleaned);


    return new Response(
      JSON.stringify(json),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );


  } catch (error) {

    console.error("AI ERROR:", error);


    return new Response(
      JSON.stringify({
        error: "AI generation failed",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

  }

}