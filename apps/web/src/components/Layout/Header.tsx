import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setScrolled(true), 0);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <AppBar
      position={isHomePage ? "fixed" : "static"}
      elevation={isHomePage && !scrolled ? 0 : 2}
      sx={{
        backgroundColor:
          isHomePage && !scrolled ? "transparent" : "background.paper",
        backdropFilter: isHomePage && !scrolled ? "blur(10px)" : "none",
        boxShadow:
          isHomePage && !scrolled ? "none" : "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        color: isHomePage && !scrolled ? "white" : "text.primary",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => navigate("/")}
        >
          <Home sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            CompClear
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
