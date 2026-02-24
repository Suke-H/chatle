import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import chat from "./api/chat";
import word from "./api/word";

const app = new Hono();

app.use("/api/*", cors());

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/api/chat", chat);
app.route("/api/word", word);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
