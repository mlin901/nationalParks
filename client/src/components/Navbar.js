const Navbar = ({ currentPage, handlePageChange }) => {
  return (
    <nav className="navbar">
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
