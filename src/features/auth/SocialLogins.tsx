import React from "react";
import { Box, Typography, Button as MuiButton } from "@mui/material";

export const SocialLogins = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <Box textAlign="center">
      <Typography variant="subtitle1" color="text.secondary" mb={1}>
        Or sign in with:
      </Typography>
      <a
        href={`${API_BASE_URL}/auth/google`}
        style={{ textDecoration: "none" }}
      >
        <MuiButton
          type="button"
          variant="outlined"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: "none",
            background: "#fff",
            "&:hover": { background: "#f5f5f5" },
          }}
          startIcon={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
          }
        >
          Google
        </MuiButton>
      </a>
    </Box>
  );
};
