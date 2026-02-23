import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { App } from "~/App";

export async function loader() {
  return json({
    correctAnswer: "おむらいす",
    todaysNo: 1,
  });
}

export default function Index() {
  const { correctAnswer, todaysNo } = useLoaderData<typeof loader>();
  return <App correctAnswer={correctAnswer} todaysNo={todaysNo} />;
}
