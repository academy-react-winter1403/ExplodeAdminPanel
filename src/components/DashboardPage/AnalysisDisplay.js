import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AnalysisDisplay = ({ aiResult, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <Typography variant="h6">در حال پردازش...</Typography>
      </Box>
    );
  }

  if (!aiResult) return null;

  // تجزیه متن به بخش‌های مختلف
  const sections = aiResult.split("###").filter((section) => section.trim());

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3, borderRadius: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        تحلیل استراتژی فروش
      </Typography>

      {sections.map((section, index) => {
        const [title, ...content] = section
          .split("\n")
          .filter((line) => line.trim());

        return (
          <Box key={index} sx={{ mb: 3 }}>
            {title && (
              <Typography
                variant="h5"
                sx={{
                  color: "secondary.main",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  "&:before": {
                    content: '" "',
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    mr: 1,
                  },
                }}
              >
                {title.trim()}
              </Typography>
            )}

            {content.map((paragraph, i) => (
              <Typography
                key={i}
                paragraph
                sx={{
                  textAlign: "justify",
                  lineHeight: 1.8,
                  "&:last-child": { mb: 0 },
                }}
              >
                {paragraph.trim()}
              </Typography>
            ))}

            {index < sections.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        );
      })}

      <Box
        sx={{
          backgroundColor: "success.light",
          p: 2,
          borderRadius: 1,
          borderLeft: "4px solid",
          borderColor: "success.main",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "success.dark" }}>
          نکته کلیدی
        </Typography>
        <Typography>
          با اجرای این تحلیل‌ها و پیشنهادات می‌توانید تا ۳۰٪ افزایش فروش داشته
          باشید.
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnalysisDisplay;
