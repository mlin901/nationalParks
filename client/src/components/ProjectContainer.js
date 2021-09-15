import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SearchParks from "../pages/SearchParks"; 
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";
import MapParks from "../pages/MapParks";

export default function ProjectContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    };
    if (currentPage === "Login") {
      return <Login />;
    };
    if (currentPage === "Signup") {
      return <Signup />;
    };
    if (currentPage === "Search") {
      return <SearchParks />;
    };
    if (currentPage === "Wishlist") {
      return <Wishlist />;
    };
    if (currentPage === "MapParks") {
      return <MapParks />;
    };
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
}
