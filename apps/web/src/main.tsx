import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./providers/AppProviders";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppProviders>
  </StrictMode>
);
