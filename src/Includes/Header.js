import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";  

export default function Header() {

  const {itemCount} = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/product" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/category" className="nav-link">
                Category
              </Link>
            </li>

            <li className="nav-item active">
              <Link to="/cart" className="nav-link">
                Cart ({itemCount})
              </Link>
            </li>
          
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
