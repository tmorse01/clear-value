import { Box, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { KPITiles } from "./KPITiles";
import { InsightCallout } from "./InsightCallout";
import { ViewModeToggle } from "./ViewModeToggle";
import { ChartsGrid } from "./ChartsGrid";
import { ReportCompsTable } from "../Report/ReportCompsTable";
import { PriceVsGlaChart } from "../Charts/PriceVsGlaChart";
import { PriceDistributionChart } from "../Charts/PriceDistributionChart";
import { SalePriceTrendChart } from "../Charts/SalePriceTrendChart";

type ViewMode = "overview" | "analysis" | "table";

export function DashboardLayout() {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");

  return (
    <Box>
      {/* KPI Tiles */}
      <KPITiles />

      {/* Insights */}
      <InsightCallout />

      {/* View Mode Toggle */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <ViewModeToggle value={viewMode} onChange={setViewMode} />
      </Paper>

      {/* Content based on view mode */}
      <Box>
        {viewMode === "overview" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PriceVsGlaChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <PriceDistributionChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <SalePriceTrendChart />
            </Grid>
          </Grid>
        )}

        {viewMode === "analysis" && (
          <Box>
            <ChartsGrid />
          </Box>
        )}

        {viewMode === "table" && (
          <Box>
            <ReportCompsTable />
          </Box>
        )}
      </Box>
    </Box>
  );
}

