import { Alert, AlertTitle, Box } from "@mui/material";
import type { ApiError } from "../../services/api";

interface ErrorAlertProps {
  error: string | Error | ApiError | null;
  onClose?: () => void;
  severity?: "error" | "warning" | "info";
  title?: string;
}

export function ErrorAlert({
  error,
  onClose,
  severity = "error",
  title,
}: ErrorAlertProps) {
  if (!error) {
    return null;
  }

  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred";

  const errorTitle = title || (severity === "error" ? "Error" : "Warning");

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{errorTitle}</AlertTitle>
      <Box>{errorMessage}</Box>
    </Alert>
  );
}

