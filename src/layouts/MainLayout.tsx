import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import NoteIcon from "@mui/icons-material/Note";
import TaskIcon from "@mui/icons-material/Task";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";

const drawerWidth = 220;
const navItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Expenses", icon: <PaidIcon />, path: "/expenses" },
  { label: "Categories", icon: <CategoryIcon />, path: "/categories" },
  { label: "Events", icon: <EventIcon />, path: "/" },
  { label: "Notes", icon: <NoteIcon />, path: "/" },
  { label: "Tasks", icon: <TaskIcon />, path: "/" },
];

const MainLayout: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(token);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    handleClose();
  };

  return (
    <Box minHeight="100vh" bgcolor="#f5f6fa">
      {isLoggedIn && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderRadius: 0,
          }}
        >
          <Toolbar sx={{ minHeight: 48, px: "12px!important" }}>
            <IconButton
              onClick={() => setSidebarOpen((open) => !open)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Organizer Dashboard
            </Typography>
            {isLoggedIn && (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                >
                  {user?.avatar ? (
                    <Avatar src={user.avatar} alt={user.name} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      borderRadius: 0, // Remove border radius
                    },
                  }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
      {isLoggedIn && (
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? drawerWidth : 48,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            [`& .MuiDrawer-paper`]: {
              width: sidebarOpen ? drawerWidth : 48,
              boxSizing: "border-box",
              background: "#fff",
              borderRight: "1px solid #e0e0e0",
              borderRadius: 0, // Remove border radius
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: "hidden",
            },
          }}
        >
          <Toolbar
            sx={{
              minHeight: 48,
            }}
          />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    height: 48,
                    background:
                      location.pathname === item.path ? "#e3f2fd" : undefined,
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    px: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "primary.main",
                      minWidth: 40, // MUI default for spacing
                      mr: sidebarOpen ? 2 : 0,
                      justifyContent: "center",
                      minHeight: 0,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      width: sidebarOpen ? undefined : "100%", // Only full width when collapsed
                      transition: "width 0.2s",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                    <ListItemText
                      primary={item.label}
                      sx={{ opacity: 1, transition: "opacity 0.2s" }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {isLoggedIn && <Box sx={{ width: drawerWidth }} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: isLoggedIn ? 8 : 0,
            p: { xs: 1, sm: 3 },
            minHeight: "calc(100vh - 64px)",
            maxWidth: 1200,
            mx: "auto",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
