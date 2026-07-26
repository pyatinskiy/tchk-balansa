import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("BODY:", body);
    console.log(
      "KEY EXISTS:",
      !!process.env.OPENAI_API_KEY
    );

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Ты профессиональный редактор подкастов.",
        },
        {
          role: "user",
          content: `
Напиши описание выпуска подкаста.

Название:
${body.title}

Описание:
${body.description}
          `,
        },
      ],
    });

    return Response.json({
      text: response.choices[0].message.content,
    });

  } catch (error: any) {

    console.error("OPENAI ERROR:");
    console.error(error);

    return Response.json(
      {
        error: error.message,
        details: error,
      },
      {
        status: 500,
      }
    );
  }
}