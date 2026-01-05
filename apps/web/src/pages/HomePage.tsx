import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Assessment,
  TrendingUp,
  Speed,
  BarChart,
  FileUpload,
  Analytics,
} from "@mui/icons-material";
import { InteractivePreview } from "../components/Landing/InteractivePreview";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  CustomStepConnector,
  CustomStepIcon,
} from "../components/Landing/CustomStepper";

export function HomePage() {
  const navigate = useNavigate();
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { elementRef: featuresRef, isVisible: featuresVisible } =
    useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const { elementRef: stepsRef, isVisible: stepsVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Assessment sx={{ fontSize: 48 }} />,
      title: "Regression Analysis",
      description:
        "Advanced statistical regression models to accurately adjust comparable sales and estimate property values.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: "Market Insights",
      description:
        "Understand market trends, price distributions, and valuation confidence with interactive visualizations.",
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: "Fast & Accurate",
      description:
        "Generate professional valuation reports in minutes with automated calculations and adjustments.",
    },
    {
      icon: <BarChart sx={{ fontSize: 48 }} />,
      title: "Interactive Dashboard",
      description:
        "Explore your data with powerful charts, filters, and real-time adjustments to refine your analysis.",
    },
    {
      icon: <FileUpload sx={{ fontSize: 48 }} />,
      title: "Easy Data Import",
      description:
        "Upload CSV files or use test data to quickly get started with your valuation analysis.",
    },
    {
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: "Detailed Reports",
      description:
        "Export comprehensive PDF reports with all calculations, charts, and comparable property details.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Comparables",
      description:
        "Import your comparable property data via CSV or use test data.",
    },
    {
      number: "2",
      title: "Enter Subject Property",
      description: "Input the property details you want to value.",
    },
    {
      number: "3",
      title: "Generate Report",
      description:
        "Get instant regression-adjusted valuation with confidence scores.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          pt: { xs: 14, md: 20 },
          pb: { xs: 10, md: 16 },
          mb: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <Container>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 900,
              mx: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Regression-Adjusted Property Valuation
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                opacity: 0.95,
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.6,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Generate accurate property valuations using advanced statistical
              regression analysis. Adjust comparable sales automatically and get
              confidence-scored estimates.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/create")}
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  backgroundColor: "white",
                  color: "primary.main",
                  borderRadius: 2,
                  boxShadow: "0 4px 14px 0 rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "grey.50",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px 0 rgba(0,0,0,0.2)",
                  },
                }}
              >
                Create Report
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  const element = document.getElementById("preview-section");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  borderRadius: 2,
                  borderWidth: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                See Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Interactive Preview Section */}
      <Box id="preview-section">
        <InteractivePreview />
      </Box>

      <Container>
        {/* Features Section */}
        <Box
          ref={featuresRef}
          sx={{
            mb: { xs: 10, md: 12 },
            py: { xs: 6, md: 8 },
            opacity: featuresVisible ? 1 : 0,
            transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 8 },
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "linear-gradient(to bottom, white, #fafafa)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ p: "0 !important" }}>
                    <Box
                      sx={{
                        color: "primary.main",
                        mb: 3,
                        display: "flex",
                        justifyContent: "center",
                        "& svg": {
                          transition: "transform 0.3s ease",
                        },
                      }}
                      onMouseEnter={(e) => {
                        const svg = e.currentTarget.querySelector("svg");
                        if (svg) svg.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        const svg = e.currentTarget.querySelector("svg");
                        if (svg) svg.style.transform = "scale(1)";
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ mb: 2, fontWeight: 700, fontSize: "1.5rem" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works Section */}
        <Box
          ref={stepsRef}
          sx={{
            mb: { xs: 10, md: 12 },
            py: { xs: 6, md: 8 },
            opacity: stepsVisible ? 1 : 0,
            transform: stepsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.2s",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: { xs: 6, md: 8 },
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            How It Works
          </Typography>
          <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 0 } }}>
            <Stepper
              activeStep={steps.length}
              alternativeLabel
              connector={<CustomStepConnector />}
              sx={{
                mb: { xs: 4, md: 6 },
                "& .MuiStepConnector-root": {
                  top: 24,
                  left: "calc(-50% + 24px)",
                  right: "calc(50% + 24px)",
                },
              }}
            >
              {steps.map((step) => (
                <Step key={step.number} completed>
                  <StepLabel
                    StepIconComponent={CustomStepIcon}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        fontWeight: 700,
                        color: "text.primary",
                        mt: 1,
                      },
                    }}
                  >
                    {step.title}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 2 }}>
              {steps.map((step) => (
                <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                  <Box sx={{ textAlign: "center", px: { xs: 2, md: 3 } }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: { xs: "0.9375rem", md: "1rem" },
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 10 },
            px: 4,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
            borderRadius: 4,
            mb: 8,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}
          >
            Create your first regression-adjusted valuation report in minutes.
            No account required.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/create")}
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "0 4px 14px 0 rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px 0 rgba(33, 150, 243, 0.4)",
              },
            }}
          >
            Create Report
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
