import React from "react";

export const SocialLogins = () => {
  const backend = "http://localhost:3000";
  return (
    <div>
      <h4>Or sign in with:</h4>
      <a href={`${backend}/auth/google`}><button type="button">Google</button></a>
      <a href={`${backend}/auth/facebook`}><button type="button">Facebook</button></a>
      <a href={`${backend}/auth/microsoft`}><button type="button">Microsoft</button></a>
    </div>
  );
};