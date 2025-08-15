import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { useAppSelector } from "@/app/hooks";

import Navbar from "@/components/Navbar";

const MainLayout: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(token);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
