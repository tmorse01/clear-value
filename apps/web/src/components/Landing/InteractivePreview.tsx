import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
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
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency, formatSquareFeet } from "../../utils/formatters";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

// Mock data for preview
const mockPriceVsGlaData = [
  { gla: 1600, price: 452682, isSubject: false },
  { gla: 1650, price: 554618, isSubject: false },
  { gla: 1700, price: 487224, isSubject: false },
  { gla: 1800, price: 529969, isSubject: false },
  { gla: 1850, price: 750651, isSubject: false },
  { gla: 1900, price: 606025, isSubject: false },
  { gla: 1950, price: 790621, isSubject: false },
  { gla: 2000, price: 694754, isSubject: false },
  { gla: 2100, price: 662618, isSubject: false },
  { gla: 2200, price: 710044, isSubject: false },
  { gla: 2300, price: 744342, isSubject: false },
  { gla: 2400, price: 754855, isSubject: false },
  { gla: 2500, price: 714215, isSubject: false },
  { gla: 3200, price: 981101, isSubject: false },
  { gla: 2000, price: 680000, isSubject: true },
];

const mockRegressionLine = [
  { gla: 1600, price: 480000 },
  { gla: 2000, price: 680000 },
  { gla: 2400, price: 750000 },
  { gla: 3200, price: 950000 },
];

const mockPriceDistribution = [
  { range: "$400K - $500K", unadjusted: 2, adjusted: 1 },
  { range: "$500K - $600K", unadjusted: 3, adjusted: 4 },
  { range: "$600K - $700K", unadjusted: 4, adjusted: 5 },
  { range: "$700K - $800K", unadjusted: 4, adjusted: 3 },
  { range: "$800K - $900K", unadjusted: 1, adjusted: 1 },
  { range: "$900K - $1M", unadjusted: 0, adjusted: 0 },
];

interface PreviewTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      gla: number;
      price: number;
      isSubject?: boolean;
    };
  }>;
}

function PreviewTooltip({ active, payload }: PreviewTooltipProps) {
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
          boxShadow: 2,
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
            <Typography variant="body2">
              Estimated: {formatCurrency(data.price)}
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
          </>
        )}
      </Box>
    );
  }
  return null;
}

export function InteractivePreview() {
  const { elementRef: previewRef, isVisible: previewVisible } =
    useScrollAnimation({
      threshold: 0.2,
      triggerOnce: true,
    });

  return (
    <Box
      ref={previewRef}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "grey.50",
        opacity: previewVisible ? 1 : 0,
        transform: previewVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            See it in action
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Watch how regression analysis transforms raw property data into
            accurate valuations with interactive visualizations.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Price vs. Gross Living Area
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
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
                    <Tooltip content={<PreviewTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      data={mockRegressionLine}
                      stroke="#4caf50"
                      strokeWidth={3}
                      dot={false}
                      name="Regression Line"
                    />
                    <Scatter
                      name="Comparable Sales"
                      data={mockPriceVsGlaData.filter((d) => !d.isSubject)}
                      fill="#2196f3"
                      shape="circle"
                    />
                    <Scatter
                      name="Subject Property"
                      data={mockPriceVsGlaData.filter((d) => d.isSubject)}
                      fill="#ff9800"
                      shape="star"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Price Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={mockPriceDistribution}
                    margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="range"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis
                      label={{
                        value: "Count",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      formatter={(value: number | undefined) =>
                        value !== undefined ? [value, "Properties"] : ["", ""]
                      }
                      labelFormatter={(label) => `Price Range: ${label}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="unadjusted"
                      fill="#9e9e9e"
                      name="Unadjusted Prices"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="adjusted"
                      fill="#2196f3"
                      name="Adjusted Prices"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
