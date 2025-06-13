import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px 24px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const AnalysisButton = ({ loading, onClick, buttonText }) => {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      disabled={loading}
      onClick={onClick}
      style={{ marginBottom: "2rem" }}
      startIcon={
        loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V6M18 12H20M6 12H4M4.929 4.929L6.343 6.343M19.071 4.929L17.657 6.343M12 18V20M17.657 17.657L19.071 19.071M6.343 17.657L4.929 19.071M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      }
    >
      {loading ? "در حال تحلیل..." : buttonText}
    </StyledButton>
  );
};

export default AnalysisButton;
