import { useState } from "react";
import { Button, Box, IconButton, Tooltip } from "@mui/material";
import { Download, CloudDownload } from "@mui/icons-material";
import { exportPDF } from "../../services/reportService";
import { useReportContext } from "../../contexts/ReportContext";
import { ErrorAlert } from "../UI/ErrorAlert";

interface PDFExportButtonProps {
  variant?: "button" | "icon";
  size?: "small" | "medium" | "large";
}

export function PDFExportButton({ variant = "button", size = "large" }: PDFExportButtonProps) {
  const { state } = useReportContext();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!state.report) {
      setError("No report available to export");
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const blob = await exportPDF(state.report.reportId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compclear-report-${state.report.reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to export PDF"
      );
    } finally {
      setIsExporting(false);
    }
  };

  if (!state.report) {
    return null;
  }

  if (variant === "icon") {
    return (
      <>
        <Tooltip title={isExporting ? "Generating PDF..." : "Export PDF Report"}>
          <IconButton
            onClick={handleExport}
            disabled={isExporting}
            color="primary"
          >
            {isExporting ? <CloudDownload /> : <Download />}
          </IconButton>
        </Tooltip>
        {error && (
          <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
            <ErrorAlert error={error} onClose={() => setError(null)} />
          </Box>
        )}
      </>
    );
  }

  return (
    <Box>
      <Button
        variant="contained"
        size={size}
        startIcon={isExporting ? <CloudDownload /> : <Download />}
        onClick={handleExport}
        disabled={isExporting}
        sx={{ minWidth: variant === "button" ? 200 : undefined }}
      >
        {isExporting ? "Generating PDF..." : "Export PDF Report"}
      </Button>
      {error && (
        <Box sx={{ mt: 2 }}>
          <ErrorAlert error={error} onClose={() => setError(null)} />
        </Box>
      )}
    </Box>
  );
}

