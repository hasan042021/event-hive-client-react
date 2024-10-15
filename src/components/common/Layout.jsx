import React from "react";
import Footer from "./Footer";
import Message from "./Alert";
import NavbarCustom from "./Navbar";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = ({ children }) => {
  return (
    <div className="layout w-full overflow-hidden">
      <header className="navbar">
        <NavbarCustom />
      </header>
      <main className="m-auto w-4/5 flex flex-col justify-center items-between">
        {children}
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
