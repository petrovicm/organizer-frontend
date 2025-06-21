import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signup } from "./authSlice";
import { Navigate, Link } from "react-router-dom";
import { SocialLogins } from "./SocialLogins";

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
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "40px auto" }}>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        style={{ display: "block", width: "100%", marginBottom: 8 }}
      />
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
        {status === "loading" ? "Signing up..." : "Sign Up"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ margin: "16px 0" }}>
        <Link to="/login">Already have an account? Login</Link>
      </div>
      <SocialLogins />
    </form>
  );
};