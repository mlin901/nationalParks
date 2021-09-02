const Navbar = ({ currentPage, handlePageChange }) => {
  return (
    <nav className="navbar">
      <h1>Visit Your National Parks</h1>
      <div className="links">
        <a
          href="#home"
          onClick={() => handlePageChange("Home")}
          className={currentPage === "Home" ? "nav-link active" : "nav-link"}
        >
          Home
        </a>
        <a
          href="#Login"
          onClick={() => handlePageChange("Login")}
          className={currentPage === "Login" ? "nav-link active" : "nav-link"}
        >
          Login
        </a>

        <a
          href="#Signup"
          onClick={() => handlePageChange("Signup")}
          className={currentPage === "Signup" ? "nav-link active" : "nav-link"}
        >
          Signup
        </a>
        <a
          href="#search"
          onClick={() => handlePageChange("Search")}
          className={currentPage === "Search" ? "nav-link active" : "nav-link"}
        >
          Search
        </a>
        <a
          href="#wishlist"
          onClick={() => handlePageChange("Wishlist")}
          className={
            currentPage === "Wishlist" ? "nav-link active" : "nav-link"
          }
        >
          Wishlist
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
