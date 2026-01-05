import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TooltipProps } from "recharts";
import { useReportContext } from "../../contexts/ReportContext";
import { formatCurrency, formatSquareFeet } from "../../utils/formatters";
import { useMemo } from "react";

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    payload: {
      gla: number;
      price: number;
      adjustedPrice?: number;
      isSubject: boolean;
    };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          p: 1,
          borderRadius: 1,
        }}
      >
        {data.isSubject ? (
          <>
            <Typography variant="body2" fontWeight={600}>
              Subject Property
            </Typography>
            <Typography variant="body2">
              GLA: {formatSquareFeet(data.gla)}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(data.price)}
            </Typography>
            <Typography variant="body2">
              GLA: {formatSquareFeet(data.gla)}
            </Typography>
            {data.adjustedPrice && (
              <Typography variant="body2" color="text.secondary">
                Adjusted: {formatCurrency(data.adjustedPrice)}
              </Typography>
            )}
          </>
        )}
      </Box>
    );
  }
  return null;
}

export function PriceVsGlaChart() {
  const { state } = useReportContext();
  const report = state.report;

  const chartData = useMemo(() => {
    if (!report) return { data: [], regressionLine: [] };

    const data = report.charts.priceVsGla.data.map((point) => ({
      ...point,
      price: point.price || 0,
    }));

    return {
      data,
      regressionLine: report.charts.priceVsGla.regressionLine,
    };
  }, [report]);

  if (!report) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Price vs. Gross Living Area
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="gla"
              name="GLA"
              label={{
                value: "Gross Living Area (sqft)",
                position: "insideBottom",
                offset: -5,
              }}
              tickFormatter={(value) => formatSquareFeet(value)}
            />
            <YAxis
              type="number"
              dataKey="price"
              name="Price"
              label={{
                value: "Sale Price",
                angle: -90,
                position: "insideLeft",
              }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {chartData.regressionLine.length > 0 && (
              <Line
                type="monotone"
                dataKey="price"
                data={chartData.regressionLine}
                stroke="#4caf50"
                strokeWidth={2}
                dot={false}
                name="Regression Line"
              />
            )}
            <Scatter
              name="Comparable Sales"
              data={chartData.data.filter((d) => !d.isSubject)}
              fill="#2196f3"
              shape="circle"
            />
            <Scatter
              name="Subject Property"
              data={chartData.data.filter((d) => d.isSubject)}
              fill="#ff9800"
              shape="star"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

