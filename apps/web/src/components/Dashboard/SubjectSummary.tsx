import { Card, CardContent, Typography, Box, Grid, Chip } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import {
  formatAddress,
  formatSquareFeet,
  formatLotSize,
} from "../../utils/formatters";

export function SubjectSummary() {
  const { state } = useReportContext();
  const report = state.report;

  if (!report) {
    return null;
  }

  const { subject } = report;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Home color="primary" />
          <Typography variant="h6">Subject Property</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
          {formatAddress(subject.address)}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Bedrooms
            </Typography>
            <Chip label={subject.beds} size="small" />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Bathrooms
            </Typography>
            <Chip label={subject.baths} size="small" />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              GLA
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatSquareFeet(subject.gla)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Lot Size
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatLotSize(subject.lotSize)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Year Built
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {subject.yearBuilt}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Age
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {subject.age} years
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

