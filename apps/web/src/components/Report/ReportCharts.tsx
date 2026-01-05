import { Box, Grid } from "@mui/material";
import { PriceVsGlaChart } from "../Charts/PriceVsGlaChart";
import { PriceDistributionChart } from "../Charts/PriceDistributionChart";
import { SalePriceTrendChart } from "../Charts/SalePriceTrendChart";

export function ReportCharts() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={12}>
          <PriceVsGlaChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PriceDistributionChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SalePriceTrendChart />
        </Grid>
      </Grid>
    </Box>
  );
}

