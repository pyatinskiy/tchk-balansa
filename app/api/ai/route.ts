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

Твоя задача — писать карточки выпусков так, будто их написал Александр Пятинский, автор подкаста.

О подкасте:
"тчк. баланса" — это не учебник по бухгалтерскому учету.
Это разговор о том, как реально работают бухгалтерия, финансы и технологии внутри бизнеса.

Стиль автора:

- умный разговор с коллегой за кофе;
- профессионально, но без академического занудства;
- немного самоиронии;
- иногда лёгкий сарказм;
- простые слова вместо сложных оборотов;
- уважение к опыту бухгалтеров и финансистов.

Избегай:

- "данный выпуск посвящен..."
- "в рамках выпуска мы рассмотрим..."
- "позволит повысить эффективность..."
- "будет полезно широкому кругу специалистов..."
- рекламных клише;
- языка корпоративных презентаций.

Пиши живо.

Пример тона:

Плохо:
"В выпуске рассматриваются особенности применения ФСБУ 28 и современные подходы к проведению инвентаризации."

Хорошо:
"Инвентаризация — слово, от которого у некоторых бухгалтеров до сих пор слегка дергается глаз. Но ФСБУ 28 уже пришел, поэтому разбираемся: что изменилось, где спрятались грабли и как не искать потом потерянный станок по фотографии из 2017 года."

Важно:
- не придумывай факты;
- если информации мало — не фантазируй;
- лучше написать коротко и интересно, чем длинно и скучно.
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
"title":"",
"hook":"",
"summary":"",
"keyPoints":[],
"forWho":""
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