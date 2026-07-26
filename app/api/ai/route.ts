import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


function cleanHtml(text: string = "") {
  return text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}



export async function POST(request: Request) {

  try {

    const body = await request.json();


    const title = body.title || "";

    const description = cleanHtml(body.description || "");


    console.log("TITLE:", title);
    console.log("DESCRIPTION:", description.slice(0,500));



    const response = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.7,


      messages: [

        {
          role: "system",

          content: `
Ты — редактор подкаста "тчк. баланса".

Ты пишешь НЕ описание выпуска.
Ты пишешь короткий анонс, после которого хочется нажать "слушать".

Стиль:
- умное бизнес-медиа;
- живой человеческий язык;
- тонкий бухгалтерский юмор;
- легкая ирония;
- без пафоса;
- без маркетинговых штампов.

Запрещено:

❌ "В этом выпуске мы поговорим..."
❌ "Разберем тему..."
❌ "Будет полезно бухгалтерам..."
❌ пересказывать содержание
❌ перечислять темы
❌ копировать исходное описание
❌ писать учебник

Нужно:

Начать с боли, странного вопроса или знакомой ситуации.

Пример интонации:

"Главбуху не нужен хакер в капюшоне. Иногда достаточно одного звонка и слишком доверчивого клика."

или

"Самая дорогая ошибка в бухгалтерии иногда начинается не с проводки. А с письма "срочно оплатить".

Покажи конфликт:
человек vs мошенник,
бухгалтер vs новые технологии,
бизнес vs хаос.

Используй только факты из исходного текста.

Верни строго JSON:

{
"description":"",
"highlights":[
"",
"",
""
]
}


Ограничения:

description:
- максимум 350 символов

highlights:
- максимум 80 символов каждый

Только JSON.
Без Markdown.
`
        },


        {
          role: "user",

          content: `

Название выпуска:

${title}


Исходное описание:

${description}

`
        }

      ]

    });



    const raw =
      response.choices[0].message.content || "";



    console.log("AI RAW:", raw);



    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



    const ai = JSON.parse(cleaned);



    return new Response(

      JSON.stringify({

        title: title,

        description: ai.description,

        highlights: ai.highlights

      }),

      {
        status:200,

        headers:{
          "Content-Type":
          "application/json; charset=utf-8"
        }
      }

    );


  } catch(error){

    console.error("AI ERROR:", error);


    return new Response(

      JSON.stringify({
        error:"AI generation failed"
      }),

      {
        status:500,
        headers:{
          "Content-Type":
          "application/json; charset=utf-8"
        }
      }

    );

  }

}