import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "./authSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={status==='loading'}>Login</button>
      {error && <div style={{color:"red"}}>{error}</div>}
      <SocialLogins />
    </form>
  );
};