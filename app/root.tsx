import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./index.css";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/maton.png" />
        <meta property="og:title" content="My Wordle Project" />
        <meta property="og:description" content="New York Time社の「WORDLE」をもとに作成した勉強用サイトです" />
        <meta property="og:url" content="https://kakutory.com/game_pages/MyWordleProject/" />
        <meta property="og:image" content="https://kakutory.com/game_pages/MyWordleProject/MyWordleProject.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kakutory" />
        <title>My Wordle Project | Kakutory</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
