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

      temperature: 0.3,

      messages: [

        {
          role: "system",
          content: `
Подготовь описание выпуска подкаста "тчк. баланса".

Цель:
человек должен захотеть нажать кнопку "слушать".

Не пересказывай весь выпуск.
Не пиши учебный материал.
Не делай длинное описание.

Пиши как описание хорошего подкаста в Яндекс Музыке или Apple Podcasts:
коротко, интересно, с интригой.

Стиль:
- профессионально;
- живой язык;
- без канцелярита;
- без рекламных фраз;
- без "в данном выпуске рассматривается";
- без "будет полезно широкому кругу специалистов".

Используй:
- неожиданный поворот;
- проблему, которая знакома слушателю;
- любопытный вопрос;
- практическую пользу.

Не придумывай факты.
Используй только информацию из описания.

Название выпуска:
${body.title}

Описание:
${body.description}

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

Требования:
- description: максимум 500 символов;
- каждый highlight: максимум 100 символов;
- никаких Markdown;
- только валидный JSON.
`
          `,
        },


        {
          role: "user",
          content: `
Название выпуска:

${body.title}


Описание из RSS:

${body.description}


Верни только JSON.

Структура:

{
  "title": "",
  "description": "",
  "highlights": [
    "",
    "",
    ""
  ]
}

Не добавляй:
- Markdown
- пояснения
- слова "Вот JSON"
- обратные кавычки

Только объект JSON.
          `,
        },

      ],

    });


    const raw = response.choices[0].message.content || "";


    console.log("AI RAW:", raw);


    // убираем возможные ```json ... ```
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