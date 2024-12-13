import React from "react";
import Footer from "./Footer";
import Message from "./Alert";
import NavbarCustom from "./Navbar";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = ({ children }) => {
  return (
    <div className="layout max-w-screen min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <header className="navbar">
        <NavbarCustom />
      </header>

      {/* Main content area, takes up available space */}
      <main className="flex-grow m-auto w-11/12 flex flex-col justify-center items-between">
        {children}
      </main>

      {/* Footer at the bottom */}
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
