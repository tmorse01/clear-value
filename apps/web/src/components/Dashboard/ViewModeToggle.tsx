import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { Dashboard, BarChart, TableChart } from "@mui/icons-material";

type ViewMode = "overview" | "analysis" | "table";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: ViewMode | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="view mode"
        fullWidth
      >
        <ToggleButton value="overview" aria-label="overview">
          <Dashboard sx={{ mr: 1 }} />
          Overview
        </ToggleButton>
        <ToggleButton value="analysis" aria-label="analysis">
          <BarChart sx={{ mr: 1 }} />
          Analysis
        </ToggleButton>
        <ToggleButton value="table" aria-label="table">
          <TableChart sx={{ mr: 1 }} />
          Table
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

