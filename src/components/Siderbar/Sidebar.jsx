import React from "react";
import logo from "../../Images/Testrig-logo-white.svg";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/constant/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-emerald-100 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

function Sidebar() {
  const LogoutUser = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  };
  return (
    <div className="flex flex-col bg-green-400 w-72 p-3 text-white h-screen">
      <div className="flex items-center px-2 py-2 w-36">
        <img src={logo} />
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
          onClick={LogoutUser}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-white" : "text-black",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
