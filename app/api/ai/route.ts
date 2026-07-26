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


Верни только JSON.

Формат:

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

Правила:
- никаких комментариев;
- никаких Markdown;
- только валидный JSON.


Не используй Markdown.
Не добавляй вступлений вроде "Вот карточка".
`,
      },

    ],

  });


  return new Response(
  response.choices[0].message.content,
  {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

}