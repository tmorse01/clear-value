import { Box, Card, CardContent, Grid, Typography, Alert } from "@mui/material";
import { Home, TrendingUp, Assessment } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import { ConfidenceBadge } from "../UI/ConfidenceBadge";
import {
  formatCurrency,
  formatSquareFeet,
  formatLotSize,
  formatAddress,
} from "../../utils/formatters";

export function ReportSummary() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const { subject, valuation, metadata } = report;
  const hasOutliers = report.outliers.length > 0;
  const insufficientComps = metadata.compCount < 3;

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Subject Property Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Home color="primary" />
                <Typography variant="h6">Subject Property</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {formatAddress(subject.address)}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Beds / Baths
                  </Typography>
                  <Typography variant="body1">
                    {subject.beds} / {subject.baths}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    GLA
                  </Typography>
                  <Typography variant="body1">
                    {formatSquareFeet(subject.gla)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Lot Size
                  </Typography>
                  <Typography variant="body1">
                    {formatLotSize(subject.lotSize)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Year Built
                  </Typography>
                  <Typography variant="body1">
                    {subject.yearBuilt} ({subject.age} years)
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Valuation Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <TrendingUp color="primary" />
                <Typography variant="h6">Valuation Estimate</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                  {formatCurrency(valuation.estimatedValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Value Range: {formatCurrency(valuation.valueRange.low)} -{" "}
                  {formatCurrency(valuation.valueRange.high)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ConfidenceBadge
                  grade={valuation.confidenceGrade}
                  score={valuation.confidenceScore}
                />
                <Typography variant="body2" color="text.secondary">
                  Based on {metadata.compCount} comparable{metadata.compCount !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Warnings */}
        {(hasOutliers || insufficientComps) && (
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Warnings:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {insufficientComps && (
                  <li>
                    <Typography variant="body2">
                      Only {metadata.compCount} comp{metadata.compCount !== 1 ? "s" : ""} used.
                      Minimum of 3 recommended for reliable results.
                    </Typography>
                  </li>
                )}
                {hasOutliers && (
                  <li>
                    <Typography variant="body2">
                      {report.outliers.length} outlier{report.outliers.length !== 1 ? "s" : ""}{" "}
                      detected and excluded from analysis.
                    </Typography>
                  </li>
                )}
              </ul>
            </Alert>
          </Grid>
        )}

        {/* Model Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Assessment color="primary" />
                <Typography variant="h6">Model Information</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="text.secondary">
                    Model Type
                  </Typography>
                  <Typography variant="body1">
                    {report.regression.modelType === "linear"
                      ? "Linear Regression"
                      : "Ridge Regression"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="text.secondary">
                    R²
                  </Typography>
                  <Typography variant="body1">
                    {(report.regression.metrics.rSquared * 100).toFixed(1)}%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="text.secondary">
                    Adjusted R²
                  </Typography>
                  <Typography variant="body1">
                    {(report.regression.metrics.adjustedRSquared * 100).toFixed(1)}%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="text.secondary">
                    Standard Error
                  </Typography>
                  <Typography variant="body1">
                    {formatCurrency(report.regression.metrics.standardError)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

