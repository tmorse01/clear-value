import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { SubjectPropertyFormCompact } from "./SubjectPropertyFormCompact";
import { FilterPanel } from "./FilterPanel";
import { FilterPresets } from "./FilterPresets";
import { TimelineScrubber } from "./TimelineScrubber";

export function ControlsPanel() {
  const handleReset = () => {
    // Reset all filters
    // This will be implemented with filter state management
  };

  return (
    <Paper
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        position: "sticky",
        top: 64,
        borderRadius: 0,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Subject Property Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Subject Property
          </Typography>
          <SubjectPropertyFormCompact />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Filters Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <Button
              size="small"
              startIcon={<Refresh />}
              onClick={handleReset}
              variant="outlined"
            >
              Reset
            </Button>
          </Box>
          <FilterPanel />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Filter Presets */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Quick Filters
          </Typography>
          <FilterPresets />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Timeline Scrubber */}
        <TimelineScrubber />
      </Box>
    </Paper>
  );
}

