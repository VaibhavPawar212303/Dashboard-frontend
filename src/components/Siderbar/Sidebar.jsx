import React from "react";
import "../Siderbar/Sidebar.css";
function Sidebar() {
  const LogoutUser = (req, res) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID')
  };
  return (
    <>
      <header>
        <nav
          id="sidebarMenu"
          class="collapse d-lg-block sidebar collapse bg-white"
        >
          <div class="position-sticky">
            <div class="list-group list-group-flush mx-3 mt-4">
            <a
                href="/"
                class="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i class="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Projects</span>
              </a>
              <a
                href="/latestblog"
                class="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i class="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Created Blogs</span>
              </a>
              <a
                href="/editor"
                class="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i class="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Editor</span>
              </a>
            </div>
          </div>
        </nav>
        <nav
          id="main-navbar"
          class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
            <a class="navbar-brand" href="/home">
              DAPPLED
            </a>
          </div>
          <button
            class="btn btn-outline-success my-2 my-sm-0 mr-3"
            type="submit"
            onClick={LogoutUser}
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="main">
        <div class="container pt-4"></div>
      </main>
    </>
  );
}

export default Sidebar;
