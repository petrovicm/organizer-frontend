import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "./authSlice";
import { Navigate, Link } from "react-router-dom";
import { SocialLogins } from "./SocialLogins";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "40px auto" }}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ margin: "16px 0" }}>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
      <SocialLogins />
    </form>
  );
};