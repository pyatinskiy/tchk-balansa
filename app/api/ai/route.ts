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

      temperature: 0.4,

      messages: [

{
role: "system",
content: `
Ты — редактор подкаста "тчк. баланса".

Твоя задача — писать короткие цепляющие описания выпусков для страницы подкаста.

Представь, что ты редактор Яндекс Музыки, Apple Podcasts или качественного бизнес-медиа.

Главная цель:
человек прочитал первые 2-3 предложения и захотел включить выпуск.

НЕ пересказывай содержание.
НЕ повторяй описание из RSS.
НЕ составляй список тем.
НЕ пиши учебный текст.

Нужно создать ощущение:
"интересно, это надо послушать".

Используй структуру:

1. Завлекающий заголовок.
Не просто название выпуска.
Сделай его интригующим, но без выдуманных фактов.

2. Описание:
2-4 коротких предложения.
Начни с проблемы, конфликта или неожиданного вопроса.
Покажи, почему тема важна.

3. Три коротких тезиса:
не темы выпуска, а причины послушать.

Игнорируй:
- служебные пояснения;
- даты подготовки;
- нормативные ссылки;
- юридические формулировки;
- техническую информацию о подкасте.

Используй только реальные факты из описания.

Стиль:
- умный;
- живой;
- немного с иронией;
- профессиональный;
- как авторский бизнес-подкаст.

Верни только JSON:

{
"title":"",
"description":"",
"highlights":[
"",
"",
""
]
}

Ограничения:
title до 80 символов.
description до 400 символов.
каждый highlight до 90 символов.
Только JSON.
Без Markdown.
`
},

{
role: "user",
content: `
Название выпуска:

${body.title}


Описание RSS:

${body.description}
`
}

]


        {
          role: "user",
          content: `
Название выпуска:

${body.title}


Описание выпуска:

${body.description}
`,
        },

      ],

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