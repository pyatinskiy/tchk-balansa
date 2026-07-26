import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const title = body.title;
    const description = body.description;


    const prompt = `
Ты редактор подкаста "тчк. баланса".

Подготовь карточку выпуска.

Название:
${title}

Описание:
${description}

Ответ строго в формате:

Заголовок:
...

О чем выпуск:
...

Главные мысли:
• ...
• ...
• ...

Кому будет полезно:
...

Стиль:
современное технологичное медиа.
Умно, живо, без канцелярита.
`;



    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });


    const result = await model.generateContent(prompt);


    const text = result.response.text();


    return Response.json({
      text,
    });


  } catch(error:any) {

    console.error(error);

    return Response.json(
      {
        error: error.message
      },
      {
        status:500
      }
    );

  }

}