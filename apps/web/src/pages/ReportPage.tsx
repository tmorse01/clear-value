import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReportContext } from "../contexts/ReportContext";
import { DashboardLayout } from "../components/Dashboard/DashboardLayout";
import { ControlsPanel } from "../components/Dashboard/ControlsPanel";
import { PDFExportButton } from "../components/Export/PDFExportButton";
import { EmptyState } from "../components/UI/EmptyState";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";

export function ReportPage() {
  const { state } = useReportContext();
  const navigate = useNavigate();

  if (state.loading) {
    return <LoadingSpinner fullScreen message="Loading report..." />;
  }

  if (!state.report) {
    return (
      <EmptyState
        title="No Report Available"
        message="Please generate a report from the home page."
        actionLabel="Go to Home"
        onAction={() => navigate("/")}
      />
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Dashboard Header Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/")}
              color="inherit"
            >
              New Analysis
            </Button>
            <Typography
              variant="h5"
              component="h1"
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}
            >
              Valuation Dashboard
            </Typography>
          </Box>
          <PDFExportButton variant="icon" />
        </Toolbar>
      </AppBar>

      {/* Dashboard Content - Split Layout */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Sidebar - Controls */}
        <Box
          sx={{
            width: { xs: 0, md: 400 },
            flexShrink: 0,
            display: { xs: "none", md: "block" },
            overflow: "hidden",
          }}
        >
          <ControlsPanel />
        </Box>

        {/* Main Dashboard Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            backgroundColor: "background.default",
          }}
        >
          <DashboardLayout />
        </Box>
      </Box>
    </Box>
  );
}

