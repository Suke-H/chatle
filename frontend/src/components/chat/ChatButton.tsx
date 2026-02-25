import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClick: () => void;
};

export const ChatButton = ({ open, onClick }: Props): JSX.Element => {
  return (
    <Zoom in>
      <Fab
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: { xs: 16, sm: 24 },
          backgroundColor: "#585858",
          color: "#fff",
          zIndex: 1001,
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </Zoom>
  );
};
