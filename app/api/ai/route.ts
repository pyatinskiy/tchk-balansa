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
Ты — главный редактор подкаста "тчк. баланса".

Это медиа о бухгалтерии, финансах и технологиях.

Стиль:
- современное технологичное медиа;
- коротко;
- понятно;
- умно, но без канцелярита.

Важно:
- не придумывай факты;
- используй только информацию из описания выпуска;
- если информации мало — пиши осторожно;
- не добавляй вымышленные цифры и выводы.

Твоя задача — подготовить редакторскую карточку выпуска.
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
  "intro": "",
  "keyPoints": [
    "",
    "",
    ""
  ],
  "audience": ""
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