import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

// サンプルAPI
app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
