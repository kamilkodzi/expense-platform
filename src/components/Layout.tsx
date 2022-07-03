import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "normalize.css";
import "../assets/main.css";

const Layout = ({ children }) => {
  return (
    <div className="main-body">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
