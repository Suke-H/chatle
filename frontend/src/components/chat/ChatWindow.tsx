import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

type Props = {
  open: boolean;
};

export const ChatWindow = ({ open }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // TODO: バックエンドのエンドポイントに合わせて変更
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "エラーが発生しました。もう一度試してください。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          bottom: 90,
          right: 24,
          width: 360,
          height: 480,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* ヘッダー */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            backgroundColor: "#585858",
            color: "#fff",
          }}
        >
          <Typography fontWeight="bold">Chat</Typography>
        </Box>

        <Divider />

        {/* メッセージ一覧 */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 2,
            py: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "75%",
                  px: 1.5,
                  py: 1,
                  borderRadius:
                    msg.role === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  backgroundColor:
                    msg.role === "user" ? "#585858" : "#f0f0f0",
                  color: msg.role === "user" ? "#fff" : "#333",
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* ローディング中のドット表示 */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: "16px 16px 16px 4px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <CircularProgress size={14} sx={{ color: "#585858" }} />
                <Typography variant="body2" color="text.secondary">
                  考え中...
                </Typography>
              </Box>
            </Box>
          )}

          <div ref={bottomRef} />
        </Box>

        <Divider />

        {/* 入力エリア */}
        <Box
          sx={{
            px: 1.5,
            py: 1,
            display: "flex",
            alignItems: "flex-end",
            gap: 0.5,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            size="small"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            sx={{ "& fieldset": { borderRadius: 2 } }}
          />
          <IconButton
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            sx={{
              mb: 0.5,
              color: "#585858",
              "&:disabled": { color: "#ccc" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
};
