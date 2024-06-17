import React from "react";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";

function Dashboard() {
  return (
    <div className="flex  flex-row justify-between">
      {/* <Navbar></Navbar> */}
      <div>
        <Slidebar></Slidebar>
      </div>
      <div >
        <div className="dashboard_container mt-8">
          <div className="flex mt-1 flex-row ml-auto mb-2 mr-5 relative">
            <input
              className="p-1 pl-5 border-2 border-black rounded-lg"
              type="text"
              placeholder="search your project..."
            />
            <CiSearch className="absolute mt-3 ml-1" />
          </div>
          <div>
            <CgProfile size={35} className="mx-2 cursor-pointer" />
          </div>
          <div>
            <TbLogout2 size={35} className="ml-2 mr-4 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
