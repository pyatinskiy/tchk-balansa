import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function POST(request: Request) {

  try {

    const body = await request.json();

    console.log("AI REQUEST:", body);


    const response = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.7,

      messages: [

        {
          role: "system",
          content: `
Ты редактор подкаста "тчк. баланса".

Это авторский подкаст про бухгалтерию, финансы и технологии.

Твоя задача — написать короткое описание выпуска, после которого профессионалу захочется нажать "слушать".

Не пересказывай RSS.
Не копируй исходный текст.
Не перечисляй темы.
Не пиши учебник.

Стиль:
- умный;
- живой;
- с легкой бухгалтерской самоиронией;
- без желтой прессы;
- без кликбейта;
- как хороший деловой подкаст.

Пиши про реальную боль слушателя.

Например:
"Все думают, что главный риск бухгалтера — ошибка в проводке. Иногда проблема начинается раньше — с одного письма, одного звонка и одной слишком уверенной просьбы."

Но не придумывай события, которых нет.

Верни строго JSON:

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

title:
- не меняй название выпуска;
- максимум 120 символов.

description:
- 3-5 предложений;
- максимум 500 символов.

highlights:
- 3 короткие мысли;
- каждый пункт максимум 90 символов.

Только JSON.
Без Markdown.
Без комментариев.
`
        },


        {
          role: "user",
          content: `
Название выпуска:

${body.title}


Описание выпуска:

${body.description}
`
        }

      ]

    });


    const text =
      response.choices[0]?.message?.content || "";


    console.log("AI RESPONSE:", text);


    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    const json = JSON.parse(cleaned);


    return Response.json(json);


  } catch (error) {

    console.error("AI ERROR:", error);


    return Response.json(
      {
        error: "AI generation failed"
      },
      {
        status:500
      }
    );

  }

}