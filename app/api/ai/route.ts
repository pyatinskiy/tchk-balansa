import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


function cleanHtml(text: string = "") {
  return text
    .replace(/<script[^>]*>.*?<\/script>/gs, "")
    .replace(/<style[^>]*>.*?<\/style>/gs, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}


function removeNoise(text: string) {

  const garbage = [
    "Основные подходы к подготовке выпуска",
    "Основные элементы учетной политики выпуска",
    "Нормативные ссылки из выпуска",
    "Список используемых сокращений",
    "События после отчетной даты",
    "Непрерывность деятельности",
    "Исправление ошибок в подкасте",
    "Прочие условия",
    "Технические вопросы"
  ];

  let result = text;

  for (const item of garbage) {
    const index = result.indexOf(item);

    if (index !== -1) {
      result = result.slice(0, index);
    }
  }

  return result.trim();
}



export async function POST(request: Request) {

  try {

    const body = await request.json();


    const title = body.title || "";

    const description = removeNoise(
      cleanHtml(body.description)
    );


    console.log("CLEAN DESCRIPTION:", description);



    const response =
      await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.8,


        messages: [

          {
            role: "system",

            content: `
Ты — главный редактор подкаста "тчк. баланса".

Это авторский подкаст Александра Пятинского про бухгалтерию, финансы и технологии.

Твой стиль:
- умный бухгалтерский юмор;
- легкая ирония;
- живой человеческий язык;
- как колонка хорошего бизнес-медиа;
- без инфобизнеса;
- без канцелярита.

Задача:
человек должен прочитать карточку и подумать:
"О, это про мои реальные проблемы. Надо послушать".

НЕ делай:
- пересказ выпуска;
- описание тем через запятые;
- "в этом выпуске мы поговорим";
- "рассмотрим вопросы";
- учебник;
- пресс-релиз.

Ищи конфликт.

Например:
не "обсуждаем цифровую безопасность",
а:
"Один пароль на все сервисы — это не экономия времени. Это приглашение для мошенников с очень удобным расписанием".

Не выдумывай факты.
Используй только информацию из текста.

Верни JSON:

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
- до 70 символов;
- цепляющий.

description:
- 2-3 предложения;
- до 350 символов;
- первая фраза должна быть крючком.

highlights:
- три причины включить выпуск;
- не темы;
- максимум 80 символов каждый.

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


Сделай карточку выпуска.
`
          }


        ]

      });



    const raw =
      response.choices[0]
        .message
        .content || "";



    console.log("AI RAW:", raw);



    const cleaned =
      raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();



    const result = JSON.parse(cleaned);



    return new Response(
      JSON.stringify(result),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json; charset=utf-8",
        },
      }
    );


  }

  catch(error) {

    console.error(
      "AI ERROR:",
      error
    );


    return new Response(

      JSON.stringify({
        error:
          "AI generation failed"
      }),

      {
        status:500,

        headers:{
          "Content-Type":
            "application/json; charset=utf-8",
        }
      }

    );

  }

}