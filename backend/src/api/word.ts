import { Hono } from "hono";

export const getTodaysWord = (): { word: string; no: number } => {
  return { word: "おむらいす", no: 1 };
};

const word = new Hono();

word.get("/", (c) => c.json(getTodaysWord()));

export default word;
