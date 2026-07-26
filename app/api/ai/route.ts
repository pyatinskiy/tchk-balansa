import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();

  const title = body.title || "";
  const description = body.description || "";

  if (!title && !description) {
    return Response.json(
      {
        error: "Нет данных для анализа",
      },
      {
        status: 400,
      }
    );
  }

  const prompt = `
Ты редактор подкаста "тчк. баланса".

Напиши красивое описание выпуска.

Название:
${title}

Описание из RSS:
${description}

Верни только JSON без markdown:

{
"title": "короткий красивый заголовок",
"description": "описание выпуска в 2-3 предложениях",
"keyPoints": [
"мысль 1",
"мысль 2",
"мысль 3"
],
"audience": "кому будет полезно"
}

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


  const content = response.choices[0].message.content;

return Response.json(
  JSON.parse(content || "{}")
);
}