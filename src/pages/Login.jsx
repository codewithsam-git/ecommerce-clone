import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import '../index.css';

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(userData.user));
      setUser(userData.user);
      // console.log(userData)
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authContainer">
      <h2 className="authTitle">Login</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-dark w-100">Login</button>
      </form>
      <Link to="/register" className="authLink">No account? Register</Link>
    </div>
  );
}
