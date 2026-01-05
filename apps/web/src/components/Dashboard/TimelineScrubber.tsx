import { Box, Typography, Slider } from "@mui/material";
import { useState, useMemo } from "react";
import { useReportContext } from "../../contexts/ReportContext";

export function TimelineScrubber() {
  const { state } = useReportContext();
  const [yearRange, setYearRange] = useState<[number, number]>([
    2020,
    2024,
  ]);

  const report = state.report;

  const yearRangeData = useMemo(() => {
    if (!report) return { min: 2020, max: 2024 };

    const years = report.comps.map((comp) => {
      const date = new Date(comp.saleDate);
      return date.getFullYear();
    });

    return {
      min: Math.min(...years),
      max: Math.max(...years),
    };
  }, [report]);

  if (!report) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Listing Date Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={yearRange}
          onChange={(_, newValue) =>
            setYearRange(newValue as [number, number])
          }
          min={yearRangeData.min}
          max={yearRangeData.max}
          valueLabelDisplay="auto"
          marks={[
            { value: yearRangeData.min, label: yearRangeData.min },
            { value: yearRangeData.max, label: yearRangeData.max },
          ]}
        />
      </Box>
    </Box>
  );
}

