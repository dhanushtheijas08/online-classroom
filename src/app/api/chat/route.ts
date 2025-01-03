// import { OpenAI } from "openai";
// import { streamText, StreamingTextResponse } from "ai";
// import { NextResponse } from "next/server";

// export const runtime = "edge";

// // Configure the OpenAI client to point to LM Studio's server
// const openai = new OpenAI({
//   baseURL: "http://localhost:1234/v1",
//   apiKey: "lm-studio",
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Create a streaming chat completion using LM Studio
//     const response = await openai.chat.completions.create({
//       model: "llama-3.2-1b-instruct", // Replace with your desired model
//       messages,
//       stream: true,
//     });

//     const result = await streamText({
//       model: openai.completions({
//         model: "llama-3.2-1b-instruct",
//         stream: true,
//       }),
//       maxTokens: 2000,
//       messages,
//     });
//     // Stream the response text to the client
//     // const stream = streamText(response.data.choices[0].message.content);

//     return new result.toTextStreamResponse();
//   } catch (error) {
//     console.error("Error in POST handler:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { Message, streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getContext } from "@/lib/content";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const lastMessage = messages[messages.length - 1];
    console.log("lastMessage", lastMessage);

    const context = await getContext(lastMessage.content, chatId);

    const prompt = {
      role: "system",
      content: `AI assistant specializes in generating quizzes based solely on the content provided in the context or previous user interactions. 
      The assistant does not assume or fabricate unrelated information, ensuring all generated questions and answers are fully relevant and accurate to the provided input. 
      
      START CONTEXT BLOCK
      ${context}
      END CONTEXT BLOCK
      
      Key Traits:
      1. When the AI assistant begins generating a quiz, it will encapsulate the content within special markers. The quiz will always start with <START QUIZ BLOCK> and conclude with <END QUIZ BLOCK>. These markers are essential for clearly defining the boundaries of the quiz content and must be included in every quiz generation process.
      2. If no content is provided or the context is insufficient to generate a quiz, the assistant will respond with: "Sorry, Can't generate the answer." 
      3. The assistant only generates quiz directly linked to the provided context, ensuring relevance and accuracy.
      4. Only generate the requested number of questions. If the context is insufficient to generate the requested number of questions, the assistant will generate as many questions as possible.
      5. The assistant will only generate one quiz.
      6. The assistant will the response in markdown format.

      Example Quiz Generation:
      <START#QUIZ#BLOCK>
      {
        "questions": [
          {
            "content": "This is a sample question",
            "questionType": "MULTIPLE_CHOICE",
            "options": [
              "Option 1",
              "Option 2"
            ],
            "correctAnswer": "Option 1",
            "points": 1
          },
          {
            "content": "This is a sample question 2",
            "questionType": "MULTIPLE_CHOICE",
            "options": [
              "Option 1",
              "Option 2"
            ],
            "correctAnswer": "Option 1",
            "points": 1
          }
        ]
      }
      <END QUIZ BLOCK>`,
    };

    const lmstudio = createOpenAICompatible({
      name: "lmstudio",
      baseURL: "http://localhost:1234/v1",
    });

    const result = streamText({
      model: lmstudio("hugging-quants/llama-3.2-1b-instruct"),
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      onFinish: async (completion) => {
        await prisma.message.create({
          data: {
            chatId: chatId,
            role: "SYSTEM",
            content: completion.text,
          },
        });
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response(JSON.stringify({ error: "Failed to generate text." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
