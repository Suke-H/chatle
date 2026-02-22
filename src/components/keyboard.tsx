import React, { useState, useEffect } from "react";
import { AlphabetMatch } from "../interfaces/AlphabetMatch";
import { GameState } from "../types/GameState";

type appProps = {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  columncnt: number;
  setColumncnt: React.Dispatch<React.SetStateAction<number>>;
  answerList: string[][];
  setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
  setJudge: React.Dispatch<React.SetStateAction<boolean>>;
  alphabetMatch: AlphabetMatch;
  gameState: GameState;
  isLoadFinished: boolean;
};

const kanaGrid: string[][] = [
  ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"],
  ["い", "き", "し", "ち", "に", "ひ", "み", "",   "り", ""  ],
  ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "を"],
  ["え", "け", "せ", "て", "ね", "へ", "め", "",   "れ", ""  ],
  ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "ん"],
];

export const Keyboard = (props: appProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = windowWidth < 600;

  const updateAnswer = (
    prevState: string[][],
    letter: string,
    row: number,
    column: number
  ) => {
    const tmp = Array.from(prevState);
    tmp[row][column] = letter;
    return tmp;
  };

  const handleClick = (letter: string) => {
    if (props.gameState !== "Playing") return;
    if (!props.isLoadFinished) return;

    if (letter === "Enter") {
      if (props.columncnt < 5) {
        alert("文字数が足りません");
      } else {
        props.setJudge(true);
      }
    } else if (letter === "Delete") {
      if (props.columncnt > 0) {
        props.setAnswerList((prev) =>
          updateAnswer(prev, "", props.round - 1, props.columncnt - 1)
        );
        props.setColumncnt((prev) => prev - 1);
      }
    } else if (props.columncnt < 5) {
      props.setAnswerList((prev) =>
        updateAnswer(prev, letter, props.round - 1, props.columncnt)
      );
      props.setColumncnt((prev) => prev + 1);
    }
  };

  const matchColors: Record<string, string> = {
    NoUse:  "#d9d9d9",
    Green:  "#538d4e",
    Yellow: "#b59f3b",
    Black:  "#3a3a3c",
  };

  const btnBase: React.CSSProperties = {
    borderRadius: "4px",
    border: "none",
    width:    isMobile ? "28px" : "40px",
    height:   isMobile ? "36px" : "48px",
    fontSize: isMobile ? "11px" : "14px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
  };

  const getKanaStyle = (key: string): React.CSSProperties => ({
    ...btnBase,
    backgroundColor: matchColors[props.alphabetMatch[key] ?? "NoUse"],
  });

  const actionBtnStyle: React.CSSProperties = {
    ...btnBase,
    width:    isMobile ? "48px" : "64px",
    fontSize: isMobile ? "10px" : "12px",
    backgroundColor: "#818384",
  };

  const gridStyle: React.CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "3px" : "5px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: isMobile ? "3px" : "5px",
  };

  return (
    <div className="Keyboard" style={{ textAlign: "center", marginTop: "8px" }}>
      <div style={gridStyle}>
        {kanaGrid.map((row, rowIdx) => (
          <div key={rowIdx} style={rowStyle}>
            {row.map((kana, colIdx) =>
              kana === "" ? (
                <div key={colIdx} style={{ ...btnBase, visibility: "hidden" }} />
              ) : (
                <button
                  key={colIdx}
                  onClick={() => handleClick(kana)}
                  style={getKanaStyle(kana)}
                >
                  {kana}
                </button>
              )
            )}
          </div>
        ))}
        <div style={{ ...rowStyle, marginTop: isMobile ? "4px" : "6px" }}>
          <button style={actionBtnStyle} onClick={() => handleClick("Delete")}>
            Delete
          </button>
          <button style={actionBtnStyle} onClick={() => handleClick("Enter")}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};
