import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="container my-4 text-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home category="all" cart={cart} setCart={setCart} />} />
        <Route path="/clothes" element={<Home category="Clothes" cart={cart} setCart={setCart} />} />
        <Route path="/electronics" element={<Home category="Electronics" cart={cart} setCart={setCart} />} />
        <Route path="/furnitures" element={<Home category="Furnitures" cart={cart} setCart={setCart} />} />
        <Route path="/toys" element={<Home category="Toys" cart={cart} setCart={setCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={user ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/orders"
          element={user ? <Orders cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}