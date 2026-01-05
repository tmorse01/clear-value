import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import {
  formatCurrency,
  formatAddress,
  formatSquareFeet,
  formatDistance,
} from "../../utils/formatters";

type SortField =
  | "address"
  | "salePrice"
  | "gla"
  | "beds"
  | "baths"
  | "distance"
  | "similarityScore"
  | "adjustedPrice"
  | "residual";

type SortDirection = "asc" | "desc";

export function ReportCompsTable() {
  const { state } = useReportContext();
  const report = state.report;

  const [sortField, setSortField] = useState<SortField>("similarityScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedComps = useMemo(() => {
    if (!report) {
      return [];
    }
    const comps = [...report.adjustedComps];
    return comps.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case "address":
          aValue = a.original.address;
          bValue = b.original.address;
          break;
        case "salePrice":
          aValue = a.original.salePrice;
          bValue = b.original.salePrice;
          break;
        case "gla":
          aValue = a.original.gla;
          bValue = b.original.gla;
          break;
        case "beds":
          aValue = a.original.beds;
          bValue = b.original.beds;
          break;
        case "baths":
          aValue = a.original.baths;
          bValue = b.original.baths;
          break;
        case "distance":
          aValue = a.distance;
          bValue = b.distance;
          break;
        case "similarityScore":
          aValue = a.similarityScore;
          bValue = b.similarityScore;
          break;
        case "adjustedPrice":
          aValue = a.adjustedPrice;
          bValue = b.adjustedPrice;
          break;
        case "residual":
          aValue = Math.abs(a.residual);
          bValue = Math.abs(b.residual);
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [report, sortField, sortDirection]);

  if (!report) {
    return null;
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comparable Properties
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflowX: "auto" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "address"}
                    direction={sortField === "address" ? sortDirection : "asc"}
                    onClick={() => handleSort("address")}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "salePrice"}
                    direction={sortField === "salePrice" ? sortDirection : "asc"}
                    onClick={() => handleSort("salePrice")}
                  >
                    Sale Price
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "gla"}
                    direction={sortField === "gla" ? sortDirection : "asc"}
                    onClick={() => handleSort("gla")}
                  >
                    GLA
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Beds</TableCell>
                <TableCell align="right">Baths</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "distance"}
                    direction={sortField === "distance" ? sortDirection : "asc"}
                    onClick={() => handleSort("distance")}
                  >
                    Distance
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "similarityScore"}
                    direction={sortField === "similarityScore" ? sortDirection : "asc"}
                    onClick={() => handleSort("similarityScore")}
                  >
                    Similarity
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Adjustments</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "adjustedPrice"}
                    direction={sortField === "adjustedPrice" ? sortDirection : "asc"}
                    onClick={() => handleSort("adjustedPrice")}
                  >
                    Adjusted Price
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "residual"}
                    direction={sortField === "residual" ? sortDirection : "asc"}
                    onClick={() => handleSort("residual")}
                  >
                    Residual
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedComps.map((comp, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: comp.isOutlier ? "error.light" : undefined,
                    opacity: comp.isOutlier ? 0.7 : 1,
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {formatAddress(comp.original.address, 30)}
                      {comp.isOutlier && (
                        <Chip
                          icon={<Warning />}
                          label="Outlier"
                          size="small"
                          color="error"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(comp.original.salePrice)}
                  </TableCell>
                  <TableCell align="right">
                    {formatSquareFeet(comp.original.gla)}
                  </TableCell>
                  <TableCell align="right">{comp.original.beds}</TableCell>
                  <TableCell align="right">{comp.original.baths}</TableCell>
                  <TableCell align="right">
                    {comp.distance !== undefined
                      ? formatDistance(comp.distance)
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {(comp.similarityScore * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ fontSize: "0.75rem" }}>
                      <div>GLA: {formatCurrency(comp.adjustments.gla)}</div>
                      <div>Beds: {formatCurrency(comp.adjustments.beds)}</div>
                      <div>Baths: {formatCurrency(comp.adjustments.baths)}</div>
                      <div>Lot: {formatCurrency(comp.adjustments.lotSize)}</div>
                      <div>Age: {formatCurrency(comp.adjustments.age)}</div>
                      {comp.adjustments.distance !== undefined && (
                        <div>Dist: {formatCurrency(comp.adjustments.distance)}</div>
                      )}
                      {comp.adjustments.time !== undefined && (
                        <div>Time: {formatCurrency(comp.adjustments.time)}</div>
                      )}
                      <div style={{ fontWeight: 600, marginTop: 4 }}>
                        Total: {formatCurrency(comp.adjustments.total)}
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(comp.adjustedPrice)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      color={comp.residual >= 0 ? "success.main" : "error.main"}
                    >
                      {formatCurrency(comp.residual)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

