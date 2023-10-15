import React from "react";
import Sidebar from "../Siderbar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="ml-5">
        <div className="ml-5">
          <div className="ml-5">
            <div className="ml-5">{<Outlet />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
