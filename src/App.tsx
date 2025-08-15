import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Login } from "./features/auth/Login";
import { Signup } from "./features/auth/Signup";
import { AuthCallback } from "./features/auth/AuthCallback";
import { logout } from "./features/auth/authSlice";
import Expenses from "./features/expenses/Expenses";
import Categories from "./features/categories/Categories";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "@/features/auth/ProtectedRoute";

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
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
