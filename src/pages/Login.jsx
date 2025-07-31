import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/");
      // console.log("Donee");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authContainer">
      <h2 className="authTitle">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-dark w-100">Login</button>
      </form>
      <Link to="/register" className="authLink">
        Don't have an account? Register
      </Link>
    </div>
  );
}