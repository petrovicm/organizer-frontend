import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // indigo-600
      light: "#818CF8", // indigo-400
      dark: "#3730A3", // indigo-800
      contrastText: "#fff",
    },
    secondary: {
      main: "#F97316", // orange-500
      light: "#FDBA74", // orange-300
      dark: "#C2410C", // orange-700
      contrastText: "#fff",
    },
    background: {
      default: "#F9FAFB", // neutral-50
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827", // neutral-900
      secondary: "#4B5563", // neutral-600
    },
    divider: "#E5E7EB", // neutral-200
    success: {
      main: "#10B981", // emerald-500
      light: "#6EE7B7",
      dark: "#047857",
      contrastText: "#fff",
    },
    error: {
      main: "#EF4444", // red-500
      light: "#FCA5A5",
      dark: "#B91C1C",
      contrastText: "#fff",
    },
    warning: {
      main: "#F59E0B", // amber-500
      light: "#FCD34D",
      dark: "#B45309",
      contrastText: "#fff",
    },
    info: {
      main: "#0EA5E9", // sky-500
      light: "#7DD3FC",
      dark: "#0369A1",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.25rem" },
    h2: { fontWeight: 700, fontSize: "1.875rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    h4: { fontWeight: 600, fontSize: "1.25rem" },
    h5: { fontWeight: 500, fontSize: "1.125rem" },
    h6: { fontWeight: 500, fontSize: "1rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.57 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 8px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#111827",
          boxShadow:
            "0px 1px 2px rgba(0,0,0,0.05), 0px 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px rgba(0,0,0,0.08), 0px 4px 8px rgba(0,0,0,0.04)",
        },
      },
    },
  },
});

export default theme;
