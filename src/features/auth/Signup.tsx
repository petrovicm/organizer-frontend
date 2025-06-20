import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signup } from "./authSlice";
import { Navigate } from "react-router-dom";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup({ email, name, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={status==='loading'}>Sign Up</button>
      {error && <div style={{color:"red"}}>{error}</div>}
      <SocialLogins />
    </form>
  );
};