import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Fab, Zoom, useMediaQuery, useTheme } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Floating scroll to top button */}
      <Zoom in={showButton}>
        <Fab
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: isMobile ? 70 : 80,
            right: isMobile ? 16 : 24,
            zIndex: 1000,
            display: { xs: "flex", sm: "flex" },
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0"
            }
          }}
          size={isMobile ? "small" : "medium"}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp sx={{ fontSize: isMobile ? 20 : 24 }} />
        </Fab>
      </Zoom>
    </>
  );
};

export default ScrollToTop;