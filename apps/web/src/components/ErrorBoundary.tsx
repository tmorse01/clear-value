import { Component, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ErrorAlert } from "./UI/ErrorAlert";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Something went wrong
          </Typography>
          <ErrorAlert error={this.state.error} />
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

