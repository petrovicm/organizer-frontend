import React from "react";

export const SocialLogins = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div>
      <h4>Or sign in with:</h4>
      <a href={`${API_BASE_URL}/auth/google`}>
        <button type="button">Google</button>
      </a>
    </div>
  );
};
