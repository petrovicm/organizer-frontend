import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "./authSlice";

export const AuthCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      dispatch(setToken(token));
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
};