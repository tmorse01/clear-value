import { Chip, Tooltip } from "@mui/material";
import { getConfidenceColor, formatConfidenceGrade } from "../../utils/formatters";
import type { ConfidenceGrade } from "@clearvalue/shared";

interface ConfidenceBadgeProps {
  grade: ConfidenceGrade;
  score: number;
  size?: "small" | "medium";
}

export function ConfidenceBadge({ grade, score, size = "medium" }: ConfidenceBadgeProps) {
  const color = getConfidenceColor(grade);
  const label = formatConfidenceGrade(grade, score);

  return (
    <Tooltip title={`Confidence Score: ${(score * 100).toFixed(1)}%`}>
      <Chip
        label={label}
        sx={{
          backgroundColor: color,
          color: "white",
          fontWeight: 600,
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        }}
        size={size}
      />
    </Tooltip>
  );
}

