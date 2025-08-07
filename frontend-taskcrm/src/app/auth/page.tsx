"use client";

import { useState } from "react";
export default function Auth() {
  const [authButton, setAuthButton] = useState("Login");

  const loginCredentials = () => {
    return (
      <>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </>
    );
  };

  const signUpCredentials = () => {
    return (
      <>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </>
    );
  };

  return (
    <div className="auth-page">
      <h1>Welcome Back!</h1>
      <p>Please login or sign up to continue.</p>
      <div className="auth-buttons">
        <div>
          <button onClick={() => setAuthButton("Login")}>Login</button>
        </div>
        <div>
          <button onClick={() => setAuthButton("Sign Up")}>Sign Up</button>
        </div>
      </div>
      <div className="auth-form">
        {authButton === "Login" ? loginCredentials() : signUpCredentials()}
      </div>
    </div>
  );
}
