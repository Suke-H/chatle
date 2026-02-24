import { Hono } from "hono";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { getTodaysWord } from "./word";

const chat = new Hono();

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const model = genai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        score: { type: SchemaType.INTEGER },
      },
      required: ["score"],
    },
  },
});

chat.post("/", async (c) => {
  const { text } = await c.req.json<{ text: string }>();
  const { word } = getTodaysWord();

  const response = await model.generateContent(
    `「${word}は${text}ですか？」に対し、0~10の10段階評価で回答してください。` +
    `0は100%No, 10は100%Yes。` +
    `10段階あるのでまずはYes/Noかを判断することで、0~5/6~10に分ける。` +
    `ここから段階評価をすること（0と10は完全一致/不一致なので慎重になること）`
  );

  const result = JSON.parse(response.response.text()) as { score: number };
  return c.json({ score: result.score });
});

export default chat;
