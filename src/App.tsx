import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { Signup } from "./features/auth/Signup";
import { AuthCallback } from "./features/auth/AuthCallback";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logout } from "./features/auth/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Welcome {user ? user.name : "to Task Organizer"}</h1>
      {!token ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </>
      ) : (
        <button onClick={() => dispatch(logout())}>Logout</button>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;