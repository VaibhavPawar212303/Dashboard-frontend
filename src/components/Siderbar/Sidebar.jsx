import React from "react";
import "../Siderbar/Sidebar.css";
import logo from "../images/Testrig-logo-white.svg";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div class="container-fluid w-full">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success bg-success">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span class="fs-5 d-none d-sm-inline">
                <img src={logo} width={150} height={50} />
              </span>
            </a>
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* <li>
                <a href="/" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-speedometer2 text-white"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline text-white">
                    Dashboard
                  </span>{" "}
                </a>
              </li> */}
              <li>
                <a href="/project" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-grid text-white"></i>
                  <span class="ms-1 d-none d-sm-inline text-white">
                    Project
                  </span>
                </a>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div class="col py-3">
          <Header />
          <div>
            <div className="ml-5"> {<Outlet />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
