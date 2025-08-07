"use client";
import "./auth.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [authButton, setAuthButton] = useState("Login");

  const BASE_URL = "http://localhost:8000/auth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Used for both login and signup
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (authButton === "Login") {
        const response = await axios.post(BASE_URL + "/login/", {
          username,
          password,
        });
        console.log("Login success:", response.data);
        router.push("/main");
      } else {
        const response = await axios.post(BASE_URL + "/signup/", {
          username,
          email,
          password,
        });
        console.log("Signup success:", response.data);
        router.push("/main");
      }
    } catch (error: any) {
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
    }
  };

  const loginCredentials = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
    );
  };

  const signUpCredentials = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
    );
  };

  return (
    <div className="auth-page">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

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
        <button onClick={handleAuth} className="submit-button">
          {authButton}
        </button>
      </div>
    </div>
  );
}
