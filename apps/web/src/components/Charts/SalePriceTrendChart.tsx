import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
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
import { formatCurrency, formatDate } from "../../utils/formatters";

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    payload: {
      date: string;
      price: number;
      adjustedPrice: number;
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
        <Typography variant="body2" fontWeight={600}>
          {data.date}
        </Typography>
        <Typography variant="body2">
          Original: {formatCurrency(data.price)}
        </Typography>
        <Typography variant="body2" color="primary">
          Adjusted: {formatCurrency(data.adjustedPrice)}
        </Typography>
      </Box>
    );
  }
  return null;
}

export function SalePriceTrendChart() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const chartData = report.charts.salePriceTrend.map((point) => ({
    ...point,
    date: formatDate(point.date),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sale Price Trend Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Sale Price",
                angle: -90,
                position: "insideLeft",
              }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#9e9e9e"
              strokeWidth={2}
              name="Original Price"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="adjustedPrice"
              stroke="#2196f3"
              strokeWidth={2}
              name="Adjusted Price"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

