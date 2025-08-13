import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `hover:text-amber-400 transition-colors pb-1 ${
      `/${location.pathname.split("/")[1]}`===path ? "border-b-2 text-amber-400 border-amber-400" : ""
    }`;
    console.log(location.pathname.split("/")[1])
  return (
    <nav className="fixed bg-gray-900 text-white shadow-md h-[4rem] w-screen border  border-white  z-10" style={{ boxShadow: "inset 0px -1px 10px 0px" }}>
      <div className="container mx-auto  flex justify-center px-4 py-3 ">
        <ul className="flex gap-8 text-3xl font-medium">
          <li>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClass("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/products" className={linkClass("/products")}>
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
