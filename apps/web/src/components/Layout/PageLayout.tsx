import { Box } from "@mui/material";
import { Header } from "./Header";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

