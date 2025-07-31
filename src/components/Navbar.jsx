import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import '../index.css';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      await signOut(auth);
      setUser(null);
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shopiNavbar">
      <div className="shopiContainer">
        <div className="shopiLeft">
          <NavLink to="/" className="shopiBrand">
            Shopi
          </NavLink>

          <div className="shopiNav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
              All
            </NavLink>
            <NavLink to="/clothes" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
              Clothes
            </NavLink>
            <NavLink to="/electronics" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
              Electronics
            </NavLink>
            <NavLink to="/furnitures" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
              Furnitures
            </NavLink>
            <NavLink to="/toys" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
              Toys
            </NavLink>
          </div>
        </div>

        <button className="shopiHamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`shopiMobileMenu ${isMenuOpen ? 'open' : ''}`}>
          <div className="shopiNavMobile">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
              onClick={toggleMenu}
            >
              All
            </NavLink>
            <NavLink
              to="/clothes"
              className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
              onClick={toggleMenu}
            >
              Clothes
            </NavLink>
            <NavLink
              to="/electronics"
              className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
              onClick={toggleMenu}
            >
              Electronics
            </NavLink>
            <NavLink
              to="/furnitures"
              className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
              onClick={toggleMenu}
            >
              Furnitures
            </NavLink>
            <NavLink
              to="/toys"
              className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
              onClick={toggleMenu}
            >
              Toys
            </NavLink>
          </div>

          <div className="shopiRightMobile">
            {user ? (
              <>
                <span className="userName">Hello, {user.displayName || user.email}!</span>
                <NavLink
                  to="/orders"
                  className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}
                  onClick={toggleMenu}
                >
                  My Orders
                </NavLink>
                <Link to="/cart" className="shopiCart" onClick={toggleMenu}>
                  <ShoppingCart size={20} />
                </Link>
                <button onClick={handleLogout} className="btn btn-sm btn-danger">
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="shopiNavlink"
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        <div className="shopiRight">
          {user ? (
            <>
              <span className="userName">Hello, {user.displayName || user.email}!</span>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? 'shopiNavlink active' : 'shopiNavlink')}>
                My Orders
              </NavLink>
              <Link to="/cart" className="shopiCart">
                <ShoppingCart size={20} />
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-danger ms-2">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="shopiNavlink">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}