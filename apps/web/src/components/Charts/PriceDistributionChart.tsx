import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useReportContext } from "../../contexts/ReportContext";
import { formatCurrency } from "../../utils/formatters";
import { useMemo } from "react";

export function PriceDistributionChart() {
  const { state } = useReportContext();
  const report = state.report;

  const chartData = useMemo(() => {
    if (!report) return [];

    const { adjusted, unadjusted } = report.charts.priceDistribution;

    // Create bins for histogram
    const allPrices = [...adjusted, ...unadjusted];
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const binCount = 10;
    const binSize = (maxPrice - minPrice) / binCount;

    const bins: Array<{
      range: string;
      unadjusted: number;
      adjusted: number;
    }> = [];

    for (let i = 0; i < binCount; i++) {
      const binMin = minPrice + i * binSize;
      const binMax = minPrice + (i + 1) * binSize;
      const range = `${formatCurrency(binMin)} - ${formatCurrency(binMax)}`;

      const unadjustedCount = unadjusted.filter(
        (p) => p >= binMin && p < binMax
      ).length;
      const adjustedCount = adjusted.filter(
        (p) => p >= binMin && p < binMax
      ).length;

      bins.push({
        range,
        unadjusted: unadjustedCount,
        adjusted: adjustedCount,
      });
    }

    return bins;
  }, [report]);

  if (!report) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Price Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number | undefined) => value !== undefined ? [value, "Properties"] : ["", ""]}
              labelFormatter={(label) => `Price Range: ${label}`}
            />
            <Legend />
            <Bar dataKey="unadjusted" fill="#9e9e9e" name="Unadjusted Prices" />
            <Bar dataKey="adjusted" fill="#2196f3" name="Adjusted Prices" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

