import Groq from "groq-sdk";


const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


type GenerateDescriptionParams = {
  title: string;
  facts: string;
};


export async function generateEpisodeDescription({
  title,
  facts,
}: GenerateDescriptionParams) {


  const response = await client.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    temperature: 0.45,

    messages: [

      {
        role: "system",

        content: `
Ты — главный редактор авторского подкаста "тчк. баланса".

Ты пишешь описания выпусков для бухгалтеров, финансовых директоров и предпринимателей.

Твой стиль:
- деловое медиа;
- умный разговорный язык;
- профессионально;
- немного самоиронии;
- тонкий бухгалтерский юмор;
- без кликбейта.

Представь:
это описание для Apple Podcasts или Яндекс Музыки,
а не рекламный баннер.

Главная задача:
чтобы человек подумал:
"О, знакомая проблема. Надо послушать".

НЕ делай:

- пересказ выпуска;
- список тем;
- учебный текст;
- рекламный текст;
- желтую прессу;
- драматизацию;
- фразы вроде:
  "миллиарды под угрозой",
  "шокирующие факты",
  "вы будете поражены",
  "тайны раскрыты".

НЕ используй:

"В этом выпуске мы поговорим..."
"Вы узнаете..."
"Этот выпуск посвящен..."

Название выпуска НЕ менять.

Создай:

1. description

3-4 предложения.

Структура:

Первое предложение:
интересное наблюдение, проблема или парадокс.

Следующие:
почему тема важна человеку из бизнеса.

Последнее:
легкий повод включить выпуск.

2. highlights

Три короткие причины послушать.

Не темы выпуска.

А именно:
какой вопрос поможет решить выпуск,
какой взгляд получить,
какую ошибку избежать.

Формат ответа:

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
до 500 символов.

highlights:
каждый до 90 символов.

Используй только факты из входных данных.

Верни только JSON.
Без Markdown.
Без комментариев.
Без обратных кавычек.
`
      },


      {
        role: "user",

        content: `
Название выпуска:

${title}


Факты:

${facts}
`
      }

    ]

  });


  const raw =
    response.choices[0].message.content || "";


  const cleaned =
    raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



  try {

    return JSON.parse(cleaned);

  } catch (error) {

    console.error(
      "AI JSON ERROR:",
      cleaned
    );


    return {

      description:
        "",

      highlights:
        []

    };

  }

}