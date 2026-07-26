import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function POST(request: Request) {

  const body = await request.json();

  console.log("BODY:", body);


  const response = await client.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    messages: [

      {
        role: "system",
        content: `
Ты — главный редактор подкаста "тчк. баланса".

Это медиа о бухгалтерии, финансах и технологиях.

Твой стиль:
- как современное технологичное медиа;
- коротко и понятно;
- без бюрократического языка;
- без скучных учебников;
- с уважением к профессионалам.

Важно:
- НЕ придумывай факты;
- НЕ добавляй информацию, которой нет в описании;
- если данных мало — пиши обобщенно;
- избегай громких обещаний.

Пиши так, чтобы карточку хотелось открыть и послушать выпуск.
        `,
      },


      {
        role: "user",
        content: `
Подготовь карточку выпуска подкаста.

Название выпуска:
${body.title}


Описание из RSS:
${body.description}


Верни строго в формате:

TITLE:
короткое название выпуска


INTRO:
2-3 предложения о чём выпуск


KEY_POINTS:
- мысль 1
- мысль 2
- мысль 3


AUDIENCE:
кому будет полезен выпуск


Не используй Markdown.
Не добавляй вступлений вроде "Вот карточка".
`,
      },

    ],

  });


  return new Response(
    JSON.stringify({
      text: response.choices[0].message.content,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

}