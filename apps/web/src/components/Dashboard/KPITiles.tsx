import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  Home,
  Assessment,
} from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import { formatCurrency } from "../../utils/formatters";
import { ConfidenceBadge } from "../UI/ConfidenceBadge";

export function KPITiles() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const { valuation, metadata, comps } = report;

  // Calculate median price per sqft
  const pricesPerSqft = comps.map((comp) => comp.salePrice / comp.gla);
  const medianPricePerSqft =
    pricesPerSqft.length > 0
      ? pricesPerSqft.sort((a, b) => a - b)[Math.floor(pricesPerSqft.length / 2)]
      : 0;

  // Calculate average distance (commented out for now, may be used later)
  // const distances = report.adjustedComps
  //   .map((comp) => comp.distance)
  //   .filter((d) => d !== undefined) as number[];
  // const avgDistance =
  //   distances.length > 0
  //     ? distances.reduce((sum, d) => sum + d, 0) / distances.length
  //     : 0;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {/* Estimated Value */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AttachMoney color="primary" />
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                Estimated Value
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 0.5 }}>
              {formatCurrency(valuation.estimatedValue)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatCurrency(valuation.valueRange.low)} - {formatCurrency(valuation.valueRange.high)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Median Price per Sqft */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <TrendingUp color="primary" />
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                Median $/Sqft
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              {formatCurrency(medianPricePerSqft)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Based on {comps.length} comps
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Comp Count */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Home color="primary" />
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                Comparables
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              {metadata.compCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {report.outliers.length > 0 && `${report.outliers.length} outliers excluded`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Confidence Score */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Assessment color="primary" />
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                Confidence
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <ConfidenceBadge
                grade={valuation.confidenceGrade}
                score={valuation.confidenceScore}
                size="medium"
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              R²: {(report.regression.metrics.rSquared * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

