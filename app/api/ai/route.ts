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
        content:
          "Ты профессиональный редактор подкаста. Пиши современно, умно, без канцелярита.",
      },

      {
        role: "user",
        content: `
Ты редактор подкаста "тчк. баланса".

Название выпуска:
${body.title}

Описание:
${body.description}


Сделай карточку выпуска:

Короткий заголовок:

О чем выпуск:

3 главные мысли:
• 
• 
•

Кому будет полезно:
`,
      },

    ],

  });


  return Response.json({
    text: response.choices[0].message.content,
  });

}