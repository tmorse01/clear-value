import { Container as MuiContainer } from "@mui/material";
import type { ContainerProps } from "@mui/material";

interface CustomContainerProps extends ContainerProps {
  children: React.ReactNode;
}

export function Container({ children, ...props }: CustomContainerProps) {
  return (
    <MuiContainer
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 4 },
        px: { xs: 3, md: 4 },
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
}
