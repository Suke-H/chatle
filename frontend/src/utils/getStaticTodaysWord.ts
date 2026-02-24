export const getStaticTodaysWord = async (
    setCorrectAnswer: React.Dispatch<React.SetStateAction<string>>,
    setTodaysNo: React.Dispatch<React.SetStateAction<number>>
) => {
    const res = await fetch("/api/word");
    const data = await res.json() as { word: string; no: number };
    setCorrectAnswer(data.word);
    setTodaysNo(data.no);
};
