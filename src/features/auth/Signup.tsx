import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signup } from "./authSlice";
import { Navigate, Link } from "react-router-dom";
import { SocialLogins } from "./SocialLogins";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button as MuiButton,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup({ email, name, password }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f6fa"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 400,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            align="center"
            mb={3}
            color="primary.main"
            fontWeight={600}
          >
            Sign Up
          </Typography>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
          />
          {error && (
            <Typography color="error" align="center" mt={1} mb={1}>
              {error}
            </Typography>
          )}
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 1, fontWeight: 600 }}
            disabled={status === "loading"}
            startIcon={
              status === "loading" ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {status === "loading" ? "Signing up..." : "Sign Up"}
          </MuiButton>
          <Box textAlign="center" mt={2}>
            <MuiLink
              component={Link}
              to="/login"
              color="primary"
              underline="hover"
              fontWeight={500}
            >
              Already have an account? Login
            </MuiLink>
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <SocialLogins />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
