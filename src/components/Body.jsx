import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Login from "./Login";
import Profile from "./Profile";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
