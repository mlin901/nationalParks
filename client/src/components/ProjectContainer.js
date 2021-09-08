import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Search from "../pages/Search";   // *****Not used anymore????
import SearchParks from "../pages/SearchParks";  // ******Added to use SearchParks instead of Search --->??????
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";

export default function ProjectContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Login") {
      return <Login />;
    }
    // if (currentPage === "Search") {
    //   return <Search />;
    // }
    if (currentPage === "Search") {
      return <SearchParks />;
    }
    if (currentPage === "Signup") {
      return <Signup />;
    }
    if (currentPage === "Wishlist") {
      return <Wishlist />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
}
