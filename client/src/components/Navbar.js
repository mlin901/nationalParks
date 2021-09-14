
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/parkstreklogo.png'
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

        <div>
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <div>
              <button className="btn btn-lg btn-light m-2" onClick={() => handlePageChange("Login")}>Login</button>
              <button className="btn btn-lg btn-light m-2" onClick={() => handlePageChange("Signup")}>Signup</button>
            </div>
          )}
        </div>

      <div className="links">
        <li>
          <a
            href="#home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >

            <img className="logo-image" src={logo} alt="Parks and Trek Logo"/>


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
