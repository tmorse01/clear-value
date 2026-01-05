import { Box, Chip } from "@mui/material";
import { useState } from "react";

type PresetType = "starter" | "luxury" | "fixer" | "cashflow" | null;

export function FilterPresets() {
  const [activePreset, setActivePreset] = useState<PresetType>(null);

  const presets = [
    { id: "starter" as PresetType, label: "Starter Home" },
    { id: "luxury" as PresetType, label: "Luxury" },
    { id: "fixer" as PresetType, label: "Fixer" },
    { id: "cashflow" as PresetType, label: "Cashflow Focus" },
  ];

  const handlePresetClick = (presetId: PresetType) => {
    if (activePreset === presetId) {
      setActivePreset(null);
      // Reset filters
    } else {
      setActivePreset(presetId);
      // Apply preset filters
      // This will be implemented with filter state management
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {presets.map((preset) => (
        <Chip
          key={preset.id}
          label={preset.label}
          onClick={() => handlePresetClick(preset.id)}
          color={activePreset === preset.id ? "primary" : "default"}
          variant={activePreset === preset.id ? "filled" : "outlined"}
          sx={{ cursor: "pointer" }}
        />
      ))}
    </Box>
  );
}

