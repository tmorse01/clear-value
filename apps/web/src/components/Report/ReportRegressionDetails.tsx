import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from "@mui/material";
import { useReportContext } from "../../contexts/ReportContext";
import { formatCurrency } from "../../utils/formatters";

export function ReportRegressionDetails() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const { regression } = report;
  const { coefficients, metrics } = regression;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Regression Model Details
        </Typography>

        <Grid container spacing={3}>
          {/* Model Metrics */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Model Performance
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        R² (Coefficient of Determination)
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {(metrics.rSquared * 100).toFixed(2)}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        Adjusted R²
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {(metrics.adjustedRSquared * 100).toFixed(2)}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        Standard Error
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatCurrency(metrics.standardError)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        Model Type
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {regression.modelType === "linear"
                          ? "Linear Regression"
                          : "Ridge Regression"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>

          {/* Coefficient Explanations */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Interpretation
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                The regression coefficients represent the estimated impact of each
                feature on property value. Positive coefficients indicate features
                that increase value, while negative coefficients indicate features
                that decrease value.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                R² measures how well the model explains the variation in sale prices.
                A higher R² indicates a better fit. Adjusted R² accounts for the
                number of features in the model.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Coefficients Table */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Regression Coefficients
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Feature
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    Coefficient
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Interpretation
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Intercept</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.intercept)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Base value when all features are zero
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">GLA (per sqft)</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.gla)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Value per square foot of living area
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Bedrooms</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.beds)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Value per additional bedroom
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Bathrooms</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.baths)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Value per additional bathroom
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Lot Size (per acre)</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.lotSize)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Value per acre of lot size
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Age (per year)</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(coefficients.age)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    Depreciation per year of age (typically negative)
                  </Typography>
                </TableCell>
              </TableRow>
              {coefficients.distance !== undefined && (
                <TableRow>
                  <TableCell>
                    <Typography variant="body2">Distance (per mile)</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatCurrency(coefficients.distance)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      Value change per mile from subject (typically negative)
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {coefficients.time !== undefined && (
                <TableRow>
                  <TableCell>
                    <Typography variant="body2">Time (per day)</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatCurrency(coefficients.time)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      Market trend adjustment per day since sale
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

