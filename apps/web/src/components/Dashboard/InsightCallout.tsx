import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { Info, Warning, CheckCircle } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";

export function InsightCallout() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const { valuation, metadata, regression } = report;
  const insights: Array<{ type: "info" | "warning" | "success"; title: string; message: string }> = [];

  // High confidence insight
  if (valuation.confidenceScore >= 0.85) {
    insights.push({
      type: "success",
      title: "High Confidence Analysis",
      message: `Strong model fit (R² = ${(regression.metrics.rSquared * 100).toFixed(1)}%) with ${metadata.compCount} quality comparables.`,
    });
  }

  // Good comp count
  if (metadata.compCount >= 8) {
    insights.push({
      type: "info",
      title: "Strong Comparable Set",
      message: `${metadata.compCount} comparables provide a robust foundation for the valuation.`,
    });
  }

  // Low comp count warning
  if (metadata.compCount < 5) {
    insights.push({
      type: "warning",
      title: "Limited Comparables",
      message: `Only ${metadata.compCount} comparables available. Consider adding more for increased reliability.`,
    });
  }

  // Outliers detected
  if (report.outliers.length > 0) {
    insights.push({
      type: "info",
      title: "Outliers Excluded",
      message: `${report.outliers.length} outlier${report.outliers.length !== 1 ? "s" : ""} detected and excluded from the regression analysis.`,
    });
  }

  // Low R-squared warning
  if (regression.metrics.rSquared < 0.7) {
    insights.push({
      type: "warning",
      title: "Lower Model Fit",
      message: `R² of ${(regression.metrics.rSquared * 100).toFixed(1)}% suggests higher variability. Review comparables for quality and similarity.`,
    });
  }

  if (insights.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {insights.map((insight, index) => (
        <Alert
          key={index}
          severity={insight.type === "success" ? "success" : insight.type === "warning" ? "warning" : "info"}
          icon={
            insight.type === "success" ? (
              <CheckCircle />
            ) : insight.type === "warning" ? (
              <Warning />
            ) : (
              <Info />
            )
          }
          sx={{ mb: 1 }}
        >
          <AlertTitle>{insight.title}</AlertTitle>
          <Typography variant="body2">{insight.message}</Typography>
        </Alert>
      ))}
    </Box>
  );
}

