import Grid from "@mui/material/Grid2";
import { PriceVsGlaChart } from "../Charts/PriceVsGlaChart";
import { PriceDistributionChart } from "../Charts/PriceDistributionChart";
import { SalePriceTrendChart } from "../Charts/SalePriceTrendChart";

export function ChartsGrid() {
  return (
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
  );
}

