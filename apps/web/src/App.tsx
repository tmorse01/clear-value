import { Box, Typography } from "@mui/material";
import { Container } from "./components/Layout";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            gap: 3,
          }}
        >
          <Typography variant="h1" component="h1" color="primary">
            CompClear
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Real Estate Valuation Platform
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Frontend setup complete. Ready for development.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
