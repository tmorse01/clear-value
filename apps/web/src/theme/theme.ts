import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem", // 32px
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem", // 28px
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem", // 24px
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem", // 16px
    },
    body2: {
      fontSize: "0.875rem", // 14px
    },
    caption: {
      fontSize: "0.75rem", // 12px
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

// Confidence grade colors
export const confidenceColors = {
  gradeA: "#4caf50", // Green - High confidence (0.85-1.0)
  gradeB: "#2196f3", // Blue - Good confidence (0.70-0.84)
  gradeC: "#ff9800", // Orange - Medium confidence (0.55-0.69)
  gradeD: "#f44336", // Red - Low confidence (< 0.55)
};

// Neutral colors for reference
export const neutralColors = {
  white: "#ffffff",
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#eeeeee",
  gray300: "#e0e0e0",
  gray400: "#bdbdbd",
  gray500: "#9e9e9e",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
  black: "#000000",
};

