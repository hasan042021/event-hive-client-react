import React from "react";
import Footer from "./Footer";
import Message from "./Alert";
import NavbarCustom from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="navbar">
        <NavbarCustom />
      </header>
      <main className="content m-auto w-4/5 flex flex-col justify-center items-between">
        {children}
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
