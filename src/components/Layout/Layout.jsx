import React from "react";
import Sidebar from "../Siderbar/Sidebar";
import Header from "../Navbar/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div className="flex flex-row bg-neutral-100 w-full">
        <Sidebar />
        <div>
          <Header />
          <div className="ml-3">{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
