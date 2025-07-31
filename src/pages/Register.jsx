import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      console.log("donee");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authContainer">
             <h2 className="authTitle">Register</h2>
             <form onSubmit={handleRegister}>
                 <input className="form-control mb-2" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                 <input className="form-control mb-2" type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
                 <input className="form-control mb-2" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                 <button className="btn btn-dark w-100">Register</button>
             </form>
             <Link to="/login" className="authLink">Already have an account? Login</Link>
         </div>
  );
}
