import React from "react";
import Footer from "./Footer";
import Message from "./Alert";
import NavbarCustom from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="layout w-full overflow-hidden">
      <ToastContainer
        position="top-right" // Ensures toast shows at the top-right of the screen
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
