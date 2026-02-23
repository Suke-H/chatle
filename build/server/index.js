import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useLoaderData } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, useRef } from "react";
import Divider from "@mui/material/Divider/index.js";
import styled from "styled-components";
import Button from "@mui/material/Button/index.js";
import Snackbar from "@mui/material/Snackbar/index.js";
import ContentCopyIcon from "@mui/icons-material/ContentCopy.js";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Root() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", href: "/maton.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "My Wordle Project" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "New York Time社の「WORDLE」をもとに作成した勉強用サイトです" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://kakutory.com/game_pages/MyWordleProject/" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://kakutory.com/game_pages/MyWordleProject/MyWordleProject.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Kakutory" }),
      /* @__PURE__ */ jsx("title", { children: "My Wordle Project | Kakutory" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Root
}, Symbol.toStringTag, { value: "Module" }));
const Answer = (props) => {
  const answerStyle = {
    borderSpacing: "6px 6px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
    marginTop: "100px"
  };
  const whiteTdStyle = {
    border: "2px solid rgb(217, 217, 217)",
    width: "60px",
    height: "70px",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "60px",
    // 文字色
    color: "Black",
    // 背景色Whiteの時のみ
    // 背景色
    backgroundColor: "White"
  };
  const blackTdStyle = { ...whiteTdStyle };
  blackTdStyle["color"] = "White";
  blackTdStyle["backgroundColor"] = "3a3a3c";
  const yellowTdStyle = { ...whiteTdStyle };
  yellowTdStyle["color"] = "White";
  yellowTdStyle["backgroundColor"] = "b59f3b";
  const greenTdStyle = { ...whiteTdStyle };
  greenTdStyle["color"] = "White";
  greenTdStyle["backgroundColor"] = "538d4e";
  const styleDict = {
    "White": whiteTdStyle,
    "Black": blackTdStyle,
    "Yellow": yellowTdStyle,
    "Green": greenTdStyle
  };
  return (
    // mapにより回答table作成
    /* @__PURE__ */ jsx("div", { className: "Answer", children: /* @__PURE__ */ jsx("table", { id: "answer", style: answerStyle, children: /* @__PURE__ */ jsx("tbody", { children: props.answerList.map((answer, i) => /* @__PURE__ */ jsx("tr", { children: answer.map((letter, j) => /* @__PURE__ */ jsx("td", { style: styleDict[props.matchList[i][j]], children: letter }, j)) }, i)) }) }) })
  );
};
const kanaGrid = [
  ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"],
  ["い", "き", "し", "ち", "に", "ひ", "み", "", "り", ""],
  ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "を"],
  ["え", "け", "せ", "て", "ね", "へ", "め", "", "れ", ""],
  ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "ん"]
];
const Keyboard = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const isMobile = windowWidth < 600;
  const updateAnswer = (prevState, letter, row, column) => {
    const tmp = Array.from(prevState);
    tmp[row][column] = letter;
    return tmp;
  };
  const handleClick = (letter) => {
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
        props.setAnswerList(
          (prev) => updateAnswer(prev, "", props.round - 1, props.columncnt - 1)
        );
        props.setColumncnt((prev) => prev - 1);
      }
    } else if (props.columncnt < 5) {
      props.setAnswerList(
        (prev) => updateAnswer(prev, letter, props.round - 1, props.columncnt)
      );
      props.setColumncnt((prev) => prev + 1);
    }
  };
  const matchColors = {
    NoUse: "#d9d9d9",
    Green: "#538d4e",
    Yellow: "#b59f3b",
    Black: "#3a3a3c"
  };
  const btnBase = {
    borderRadius: "4px",
    border: "none",
    width: isMobile ? "28px" : "40px",
    height: isMobile ? "36px" : "48px",
    fontSize: isMobile ? "11px" : "14px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff"
  };
  const getKanaStyle = (key) => ({
    ...btnBase,
    backgroundColor: matchColors[props.alphabetMatch[key] ?? "NoUse"]
  });
  const actionBtnStyle = {
    ...btnBase,
    width: isMobile ? "48px" : "64px",
    fontSize: isMobile ? "10px" : "12px",
    backgroundColor: "#818384"
  };
  const gridStyle = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "3px" : "5px"
  };
  const rowStyle = {
    display: "flex",
    gap: isMobile ? "3px" : "5px"
  };
  return /* @__PURE__ */ jsx("div", { className: "Keyboard", style: { textAlign: "center", marginTop: "8px" }, children: /* @__PURE__ */ jsxs("div", { style: gridStyle, children: [
    kanaGrid.map((row, rowIdx) => /* @__PURE__ */ jsx("div", { style: rowStyle, children: row.map(
      (kana, colIdx) => kana === "" ? /* @__PURE__ */ jsx("div", { style: { ...btnBase, visibility: "hidden" } }, colIdx) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleClick(kana),
          style: getKanaStyle(kana),
          children: kana
        },
        colIdx
      )
    ) }, rowIdx)),
    /* @__PURE__ */ jsxs("div", { style: { ...rowStyle, marginTop: isMobile ? "4px" : "6px" }, children: [
      /* @__PURE__ */ jsx("button", { style: actionBtnStyle, onClick: () => handleClick("Delete"), children: "Delete" }),
      /* @__PURE__ */ jsx("button", { style: actionBtnStyle, onClick: () => handleClick("Enter"), children: "Enter" })
    ] })
  ] }) });
};
const Notes = () => {
  const HoverLink = styled.a`
		transition: transform 0.3s ease;
		display: inline-block;

		&:hover {
		transform: scale(1.1);
		}
	`;
  const noteStyle = {
    marginBottom: "40px",
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(88, 88, 88)",
    fontFamily: [
      "Inter",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(",")
  };
  return /* @__PURE__ */ jsxs("div", { className: "Notes", style: noteStyle, children: [
    /* @__PURE__ */ jsx(
      Divider,
      {
        sx: {
          borderBottomWidth: 3,
          width: "95%"
        }
      }
    ),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "このサイトは、New York Times社の",
        /* @__PURE__ */ jsx("a", { href: "https://www.nytimes.com/games/wordle/index.html", children: "WORDLE" }),
        "をもとに作成した勉強用サイトです"
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "GitHubリポジトリは",
        /* @__PURE__ */ jsx("a", { href: "https://github.com/Suke-H/wordle-sample/", children: "こちら" }),
        "と",
        /* @__PURE__ */ jsx("a", { href: "https://github.com/Suke-H/wordle-in-gcp/", children: "こちら" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(HoverLink, { href: "https://kakutory.com/", children: /* @__PURE__ */ jsx("img", { src: "kakutory_gray.png", alt: "kakutory", width: "300" }) })
  ] });
};
const shareStyle = {
  marginBottom: "40px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "rgb(88, 88, 88)",
  fontFamily: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"].join(",")
};
const ShareResultButton = (props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const buttonRef = useRef(null);
  const snackbarStyle = buttonRef.current ? {
    position: "absolute",
    top: `${buttonRef.current.offsetTop - 60}px`,
    // ボタンの上に配置
    left: "50%",
    // ビューポートの中央
    transform: "translate(-50%, 0)"
    // 要素の幅の半分だけ左にずらす
  } : {};
  const handleCopyText = () => {
    const textToCopy = props.resultText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setOpenSnackbar(true);
    }).catch((err) => {
      console.error("テキストのコピーに失敗しました:", err);
    });
  };
  const handleCloseSnackbar = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: shareStyle, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        ref: buttonRef,
        variant: "contained",
        onClick: handleCopyText,
        sx: {
          textTransform: "none",
          backgroundColor: "#585858",
          padding: "10px 30px",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#585858"
          }
        },
        startIcon: /* @__PURE__ */ jsx(ContentCopyIcon, {}),
        children: "Share"
      }
    ),
    /* @__PURE__ */ jsx(
      Snackbar,
      {
        style: snackbarStyle,
        open: openSnackbar,
        autoHideDuration: 2e3,
        onClose: handleCloseSnackbar,
        message: "Copied!",
        anchorOrigin: { vertical: "top", horizontal: "center" }
      }
    )
  ] });
};
const checkWordMatch = (correctAnswer, answerList, matchList, round) => {
  const tmpMatchList = Array.from(matchList);
  for (let i = 0; i < 5; i++) {
    if (correctAnswer.indexOf(answerList[round - 1][i]) !== -1) {
      if (answerList[round - 1][i] === correctAnswer[i]) {
        tmpMatchList[round - 1][i] = "Green";
      } else {
        tmpMatchList[round - 1][i] = "Yellow";
      }
    } else {
      tmpMatchList[round - 1][i] = "Black";
    }
  }
  return tmpMatchList;
};
const checkClear = (correctAnswer, answerList, round) => {
  if (correctAnswer === "") {
    alert("Server Error: Please reload the page.");
    return "Playing";
  }
  const wordList = [];
  for (let j = 0; j < 5; j++) {
    wordList.push(answerList[round - 1][j]);
  }
  const submitWord = wordList.join("");
  if (submitWord == correctAnswer) {
    alert("clear!!");
    return "GameClear";
  } else if (round == 6) {
    alert(correctAnswer);
    return "GameOver";
  }
  return "Playing";
};
const pushedEnterProcess = async (correctAnswer, answerList, matchList, round, setMatchList, setAlphabetMatch, setGameState) => {
  const tmpMatchList = checkWordMatch(
    correctAnswer,
    answerList,
    matchList,
    round
  );
  const _gameState = checkClear(correctAnswer, answerList, round);
  setGameState(_gameState);
  setMatchList(tmpMatchList);
  const newMatch = {};
  for (let i = 0; i < 5; i++) {
    newMatch[answerList[round - 1][i]] = tmpMatchList[round - 1][i];
  }
  setAlphabetMatch((prevMatch) => ({
    ...prevMatch,
    ...newMatch
  }));
  return true;
};
const makeGameResultText = (matchList, todaysNo) => {
  const hashtag = "#MyWordleProject_" + todaysNo;
  const emojis = convertAnswerMatchToEmojis(matchList);
  const notes = "*An unofficial Wordle learning project.";
  const url = "https://kakutory.com/game_pages/MyWordleProject";
  return hashtag + "\n" + emojis + "\n\n" + notes + "\n" + url;
};
const convertAnswerMatchToEmojis = (matchList) => {
  const emojiList = matchList.map((row) => {
    return row.map((match) => {
      if (match === "Black") {
        return "⬛";
      } else if (match === "Yellow") {
        return "🟨";
      } else if (match === "Green") {
        return "🟩";
      } else {
        return "";
      }
    }).join("");
  }).filter((row) => row.length > 0);
  return emojiList.join("\n");
};
const saveGameDataInLocal = (todaysNo, answerList) => {
  const gameData = {
    todaysNo: todaysNo.toString(),
    answerList
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
};
const loadGameDataInLocal = (_todaysNo) => {
  const initAnswerList = new Array(6);
  for (let i = 0; i < 6; i++) {
    initAnswerList[i] = new Array(5).fill("");
  }
  return initAnswerList;
};
const resetGameDataInLocal = () => {
  localStorage.removeItem("gameData");
};
const saveGameData = (todaysNo, answerList) => {
  saveGameDataInLocal(todaysNo, answerList);
};
const loadGameData = (todaysNo, correctAnswer, loadDataSetters) => {
  const answerList = loadGameDataInLocal();
  loadDataSetters.setAnswerList(answerList);
  const index = answerList.findIndex((row) => row.includes(""));
  const round = index !== -1 ? index : 6;
  loadDataSetters.setRound(round + 1);
  if (round === 0) {
    resetGameData();
    return;
  }
  loadDataSetters.setGameState(checkClear(correctAnswer, answerList, round));
  const matchList = calcMatchList(answerList, correctAnswer, round);
  loadDataSetters.setMatchList(matchList);
  loadDataSetters.setAlphabetMatch(calcAlphabetMatch(answerList, matchList, round));
};
const resetGameData = () => {
  resetGameDataInLocal();
};
const calcMatchList = (answerList, correctAnswer, round) => {
  let matchList = new Array(6);
  for (let i = 0; i < 6; i++) {
    matchList[i] = new Array(5).fill("White");
  }
  for (let i = 1; i <= round; i++) {
    matchList = checkWordMatch(correctAnswer, answerList, matchList, i);
  }
  return matchList;
};
const initializeAlphabetMatch = () => {
  const result = {};
  for (let charCode = 65; charCode <= 90; charCode++) {
    const letter = String.fromCharCode(charCode);
    result[letter] = "NoUse";
  }
  return result;
};
const calcAlphabetMatch = (answerList, matchList, round) => {
  const newMatch = initializeAlphabetMatch();
  for (let i = 0; i < round; i++) {
    for (let j = 0; j < 5; j++) {
      newMatch[answerList[i][j]] = matchList[i][j];
    }
  }
  return newMatch;
};
const App = ({ correctAnswer, todaysNo }) => {
  const initAnswerList = new Array(6);
  for (let i = 0; i < 6; i++) {
    initAnswerList[i] = new Array(5).fill("");
  }
  const initMatchList = new Array(6);
  for (let i = 0; i < 6; i++) {
    initMatchList[i] = new Array(5).fill("White");
  }
  const initializeAlphabetMatch2 = () => {
    const result = {};
    for (let charCode = 65; charCode <= 90; charCode++) {
      const letter = String.fromCharCode(charCode);
      result[letter] = "NoUse";
    }
    return result;
  };
  const initAlphabetMatch = initializeAlphabetMatch2();
  const [answerList, setAnswerList] = useState(initAnswerList);
  const [matchList, setMatchList] = useState(initMatchList);
  const [gameState, setGameState] = useState("Playing");
  const [round, setRound] = useState(0);
  const [alphabetMatch, setAlphabetMatch] = useState(initAlphabetMatch);
  const [judge, setJudge] = useState(false);
  const [columncnt, setColumncnt] = useState(0);
  const [isLoadFinished, setIsLoadFinished] = useState(false);
  useEffect(() => {
    if (todaysNo === 0) return;
    const loadDataSetters = {
      setAnswerList,
      setMatchList,
      setGameState,
      setRound,
      setAlphabetMatch
    };
    loadGameData(todaysNo, correctAnswer, loadDataSetters);
    setIsLoadFinished(true);
  }, [todaysNo]);
  useEffect(() => {
    if (!judge) return;
    if (gameState !== "Playing") return;
    pushedEnterProcess(
      correctAnswer,
      answerList,
      matchList,
      round,
      setMatchList,
      setAlphabetMatch,
      setGameState
    ).then(() => {
      setRound(round + 1);
      setColumncnt(0);
      saveGameData(todaysNo, answerList);
    });
    setJudge(false);
  }, [judge]);
  return /* @__PURE__ */ jsxs("div", { className: "App", style: appStyle, children: [
    /* @__PURE__ */ jsx(Answer, { answerList, matchList }),
    /* @__PURE__ */ jsx(
      Keyboard,
      {
        round,
        setRound,
        columncnt,
        setColumncnt,
        answerList,
        setAnswerList,
        setJudge,
        alphabetMatch,
        gameState,
        isLoadFinished
      }
    ),
    /* @__PURE__ */ jsx(ShareResultButton, { resultText: makeGameResultText(matchList, todaysNo) }),
    /* @__PURE__ */ jsx(Notes, {})
  ] });
};
const appStyle = {
  margin: "0 auto",
  width: "100%",
  maxWidth: "600px"
  // 最大幅を指定する
};
async function loader() {
  return json({
    correctAnswer: "おむらいす",
    todaysNo: 1
  });
}
function Index() {
  const { correctAnswer, todaysNo } = useLoaderData();
  return /* @__PURE__ */ jsx(App, { correctAnswer, todaysNo });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-E7S_zNAZ.js", "imports": ["/assets/components-BySryKae.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Cv3nF4-M.js", "imports": ["/assets/components-BySryKae.js"], "css": ["/assets/root-tn0RQdqM.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-doNxvCnu.js", "imports": ["/assets/components-BySryKae.js"], "css": [] } }, "url": "/assets/manifest-8511e0c0.js", "version": "8511e0c0" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
