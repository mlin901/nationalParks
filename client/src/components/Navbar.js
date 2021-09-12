import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = ({ currentPage, handlePageChange }) => {
// ******
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

// ******
  return (
    <nav className="navbar">
      {/* ****** */}
              <div>
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <div><h1>logged out</h1>
              </div>
          )}
        </div>
        {/* ****** */}
      <div className="links">
        <li>
          <a
            href="#home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#Login"
            onClick={() => handlePageChange("Login")}
            className={currentPage === "Login" ? "nav-link active" : "nav-link"}
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="#Logout"
            onClick={() => handlePageChange("Logout")}
            className={
              currentPage === "Logout" ? "nav-link active" : "nav-link"
            }
          >
            Logout
          </a>
        </li>
        <li>
          <a
            href="#Signup"
            onClick={() => handlePageChange("Signup")}
            className={
              currentPage === "Signup" ? "nav-link active" : "nav-link"
            }
          >
            Signup
          </a>
        </li>
        <li>
          <a
            href="#search"
            onClick={() => handlePageChange("Search")}
            className={
              currentPage === "Search" ? "nav-link active" : "nav-link"
            }
          >
            Search
          </a>
        </li>
        <li>
          <a
            href="#wishlist"
            onClick={() => handlePageChange("Wishlist")}
            className={
              currentPage === "Wishlist" ? "nav-link active" : "nav-link"
            }
          >
            Wishlist
          </a>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
