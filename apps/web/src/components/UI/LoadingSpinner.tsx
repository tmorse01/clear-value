import { Box, CircularProgress, Backdrop } from "@mui/material";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: number;
  message?: string;
}

export function LoadingSpinner({
  fullScreen = false,
  size = 40,
  message,
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" size={size} />
        {message && (
          <Box sx={{ color: "white", textAlign: "center" }}>{message}</Box>
        )}
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 4,
      }}
    >
      <CircularProgress size={size} />
      {message && <Box sx={{ color: "text.secondary" }}>{message}</Box>}
    </Box>
  );
}

