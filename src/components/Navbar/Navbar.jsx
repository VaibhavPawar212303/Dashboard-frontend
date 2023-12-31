import React from "react";

function Navbar() {
  return (
   
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand ml-1" href="/home">
          DAPPLED
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/home">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Dashboard <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <a href="/register">
            <button
              class="btn btn-outline-success my-2 my-sm-0 mr-3"
              type="submit"
            >
              Register
            </button>
          </a>
          <a href="/login">
            <button
              class="btn btn-outline-success my-2 my-sm-0 mr-3"
              type="submit"
            >
              Login
            </button>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
