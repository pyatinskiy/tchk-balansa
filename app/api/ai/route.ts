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
Ты — главный редактор подкаста "тчк. баланса".

Это медиа о бухгалтерии, финансах и технологиях.

Твоя задача — написать описание выпуска так, чтобы человек захотел нажать кнопку "слушать".

Не пересказывай весь выпуск.
Не пиши учебник.
Не используй канцелярит.

Стиль:
- современное технологичное медиа;
- живой профессиональный язык;
- коротко и цепко;
- с уважением к аудитории бухгалтеров и финансистов.

Используй:
- проблему слушателя;
- интересный поворот;
- практическую пользу.

Не придумывай факты.
Используй только информацию из описания.

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
- description максимум 500 символов;
- каждый highlight максимум 100 символов;
- никаких Markdown;
- никаких комментариев;
- только валидный JSON.
`,
        },


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