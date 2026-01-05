import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Grid,
} from "@mui/material";
import { ArrowBack, Science, Info } from "@mui/icons-material";
import { CSVUpload } from "../components/Forms/CSVUpload";
import { SubjectPropertyForm } from "../components/Forms/SubjectPropertyForm";
import { useReportContext } from "../contexts/ReportContext";
import { generateReport } from "../services/reportService";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { Container } from "../components/Layout";
import { loadExampleCSV } from "../utils/exampleData";

const steps = [
  "Upload Comparables",
  "Enter Subject Property",
  "Generate Report",
];

export function CreateReportPage() {
  const { state, setReport, setLoading, setError, setComps, setSubject } =
    useReportContext();
  const [activeStep, setActiveStep] = useState(0);
  const [isExampleData, setIsExampleData] = useState(false);
  const [isLoadingExample, setIsLoadingExample] = useState(false);
  const hasLoadedExample = useRef(false);
  const navigate = useNavigate();

  const canGenerateReport =
    state.subject !== null && state.comps.length >= 3 && !state.loading;

  const handleGenerateReport = async () => {
    if (!state.subject || state.comps.length < 3) {
      setError("Subject property and at least 3 comps are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const report = await generateReport({
        subject: state.subject,
        comps: state.comps,
        config: state.config,
      });

      setReport(report);
      navigate(`/report/${report.reportId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate report"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load example data on mount (development only)
  useEffect(() => {
    if (!hasLoadedExample.current && state.comps.length === 0) {
      hasLoadedExample.current = true;
      setIsLoadingExample(true);
      loadExampleCSV()
        .then(({ comps, subject }) => {
          setComps(comps);
          setSubject(subject);
          setIsExampleData(true);
          setActiveStep(1);
        })
        .catch((err) => {
          console.warn("Failed to load example data:", err);
          // Silently fail - user can still upload their own CSV
        })
        .finally(() => {
          setIsLoadingExample(false);
        });
    }
  }, [setComps, setSubject, state.comps.length]);

  // Update active step based on state
  useEffect(() => {
    if (state.comps.length > 0 && activeStep === 0) {
      setActiveStep(1);
    } else if (state.subject !== null && activeStep === 1) {
      setActiveStep(2);
    }
  }, [state.comps.length, state.subject, activeStep]);

  return (
    <Container>
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Create Regression-Adjusted Valuation Report
          </Typography>
          {isExampleData && (
            <Chip
              icon={<Science />}
              label="Example Data"
              color="info"
              size="small"
              sx={{ fontWeight: 500 }}
            />
          )}
        </Box>

        {isExampleData && (
          <Alert
            icon={<Info />}
            severity="info"
            sx={{ mb: 3 }}
            action={
              <Button
                size="small"
                onClick={() => {
                  setComps([]);
                  setSubject(null);
                  setIsExampleData(false);
                  setActiveStep(0);
                  hasLoadedExample.current = false;
                }}
              >
                Clear
              </Button>
            }
          >
            <Typography variant="body2" component="div">
              <strong>Development Mode:</strong> Example data has been pre-loaded
              for testing. You can upload your own CSV file or clear this data to
              start fresh.
            </Typography>
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {isLoadingExample ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <LoadingSpinner message="Loading example data..." />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Step 1: CSV Upload */}
            <Grid size={12}>
              <Card
                elevation={2}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    elevation: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Step 1: Upload Comparable Properties
                    </Typography>
                    {state.comps.length > 0 && (
                      <Chip
                        label={`${state.comps.length} loaded`}
                        color="success"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    )}
                  </Box>
                  <CSVUpload />
                  {state.comps.length > 0 && !isExampleData && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      {state.comps.length} comparable
                      {state.comps.length !== 1 ? "s" : ""} loaded successfully
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Step 2: Subject Property */}
            <Grid size={12}>
              <Card
                elevation={2}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    elevation: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Step 2: Enter Subject Property
                    </Typography>
                    {state.subject && (
                      <Chip
                        label="Saved"
                        color="success"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    )}
                  </Box>
                  <SubjectPropertyForm isExampleData={isExampleData} />
                </CardContent>
              </Card>
            </Grid>

            {/* Step 3: Generate Report */}
            <Grid size={12}>
              <Card
                elevation={2}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    elevation: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Step 3: Generate Report
                  </Typography>
                  {state.comps.length < 3 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      At least 3 comparable properties are required to generate a
                      report. Currently have {state.comps.length}.
                    </Alert>
                  )}
                  {!state.subject && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Please enter the subject property details above.
                    </Alert>
                  )}
                  {canGenerateReport && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      ✓ Ready to generate report with {state.comps.length}{" "}
                      comparable{state.comps.length !== 1 ? "s" : ""}
                    </Alert>
                  )}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerateReport}
                    disabled={!canGenerateReport}
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {state.loading ? "Generating Report..." : "Generate Report"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {state.error && (
          <Box sx={{ mt: 3 }}>
            <ErrorAlert error={state.error} onClose={() => setError(null)} />
          </Box>
        )}

        {state.loading && (
          <LoadingSpinner fullScreen message="Generating report..." />
        )}
      </Box>
    </Container>
  );
}
