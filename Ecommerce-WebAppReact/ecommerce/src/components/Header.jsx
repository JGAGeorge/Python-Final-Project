import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCart } from "../features/cart/cartSlice";
import { fetchProfile, logout } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = Boolean(token);
  const isAdmin = user?.is_staff;

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar shadow-sm">
      <div className="container">

        {/* LOGO */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="logo-icon"
            roundedCircle
          />
          <span className="fw-bold text-white">Naturina</span>
        </Link>

        {/* TOGGLE */}
        <button
          className="navbar-toggler bg-light"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            {/* HOME */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            {/* CART */}
            <li className="nav-item position-relative">
              <Link className="nav-link text-white cart-link" to="/cart" onClick={closeMenu}>
                <PiShoppingCartSimpleBold size={20} />

                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>

            {/* LOGGED IN */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/checkout" onClick={closeMenu}>
                    Checkout
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/orders" onClick={closeMenu}>
                    Orders
                  </Link>
                </li>

                {/* PROFILE */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile" onClick={closeMenu}>
                    👤 {user?.first_name || "User"}
                  </Link>
                </li>

                {/* ADMIN */}
                {isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-warning d-flex align-items-center gap-1"
                      to="/admin"
                      onClick={closeMenu}
                    >
                      <FaShieldAlt />
                      Admin
                    </Link>
                  </li>
                )}

                {/* LOGOUT */}
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* NOT LOGGED IN */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register" onClick={closeMenu}>
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;