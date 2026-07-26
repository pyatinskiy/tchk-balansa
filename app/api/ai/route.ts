import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();

  const title = body.title;
  const description = body.description;

  const prompt = `
Ты редактор подкаста "тчк. баланса".

Напиши красивое описание выпуска.

Название:
${title}

Описание из RSS:
${description}

Сделай ответ в формате:

Короткий заголовок:
...

О чем выпуск:
...

3 главные мысли:
• ...
• ...
• ...

Кому будет полезно:
...

Стиль:
современно, умно, но без канцелярита.
Как редактор технологичного медиа.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "Ты профессиональный редактор подкастов.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });


  return Response.json({
    text: response.choices[0].message.content,
  });
}