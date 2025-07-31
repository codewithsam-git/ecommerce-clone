import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Clothes from './pages/Clothes';
import Electronics from './pages/Electronics';
import Furnitures from './pages/Furnitures';
import Toys from './pages/Toys';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Orders';
import Register from './pages/Register';
import { useState, useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);
  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furnitures" element={<Furnitures />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<CheckoutPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />      
      </Routes>
    </Router>
  );
}
