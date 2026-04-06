import { useRef } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "bootstrap";
import { useSelector } from "react-redux";

function Header() {
  const collapseRef = useRef(null);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleMenu = () => {
    const bsCollapse = new Collapse(collapseRef.current, { toggle: true });
    bsCollapse.toggle();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark header-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo.png" alt="logo" className="logo-img" />
          <span className="brand-name ms-2">Naturina</span>
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" ref={collapseRef}>
          <ul className="navbar-nav ms-auto text-center flex-column flex-lg-row">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
            </li>
            <li className="nav-item"><Link className="nav-link" to="/checkout">Checkout</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;