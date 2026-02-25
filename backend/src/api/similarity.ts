import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getTodaysWord } from "./word";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

const similarity = new Hono();

similarity.post("/", async (c) => {
  const { text } = await c.req.json<{ text: string }>();
  const { word } = getTodaysWord();

  const model = genAI.getGenerativeModel({ model: "embedding-001" });

  try {
    const targetResult = await model.embedContent(word);
    const guessResult = await model.embedContent(text);

    const cosSim = cosineSimilarity(
      targetResult.embedding.values,
      guessResult.embedding.values
    );

    const score = Math.round((cosSim + 1) / 2 * 100);

    return c.json({ score });
  } catch (error) {
    console.error("Error calling Gemini Embedding API:", error);
    return c.json({ error: "Failed to calculate similarity" }, 500);
  }
});

export default similarity;
