export const getStaticTodaysWord = (
    setCorrectAnswer: React.Dispatch<React.SetStateAction<string>>,
    setTodaysNo: React.Dispatch<React.SetStateAction<number>>
) => {
    setCorrectAnswer("WORLD");
    setTodaysNo(1);
};
