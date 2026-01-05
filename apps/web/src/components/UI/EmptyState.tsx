import { Box, Typography, Button } from "@mui/material";
import { Description } from "@mui/icons-material";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 4,
        textAlign: "center",
      }}
    >
      {icon || <Description sx={{ fontSize: 64, color: "text.secondary" }} />}
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

