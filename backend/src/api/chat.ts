import { Hono } from "hono";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const chat = new Hono();

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const model = genai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        score: {
          type: SchemaType.INTEGER,
        },
      },
      required: ["score"],
    },
  },
});

chat.post("/", async (c) => {
  const response = await model.generateContent(
    "この文章はポジティブですか？「今日はとても良い天気で気分が最高です！」\n" +
    "0=完全にNo, 10=完全にYes で答えてください。"
  );

  const result = JSON.parse(response.response.text()) as { score: number };

  return c.json({ score: result.score });
});

export default chat;
