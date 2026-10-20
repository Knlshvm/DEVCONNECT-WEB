import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Login from "./Login";
import Profile from "./Profile";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet>
        <Login />
        <Profile />
      </Outlet>
    </div>
  );
};

export default Body;
