import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const LogoutUser = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  if (location.pathname === "/") {
    return (
      <div className="mb-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-5 bg-body-tertiary">
          <div className="px-5"></div>
          <div class="container d-flex justify-content-center">
            <a class="navbar-brand ml-5" href="/">
              <h3 className="ml-5" style={{ color: "#42bd8b" }}>
                TESTRIG Automation Dashboard
              </h3>
            </a>
          </div>
          <div className="d-flex justify-content-center w-25">
            <ul
              class="nav nav-pills mb-3 d-flex flex-row"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </li>
              <li class="nav-item px-3">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => LogoutUser()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-5 bg-body-tertiary">
          <div className="px-5">
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div class="container d-flex justify-content-center">
            <a class="navbar-brand" href="/">
              <h3 style={{ color: "#42bd8b" }}>TESTRIG Automation Dashboard</h3>
            </a>
          </div>
          <div className="d-flex justify-content-center w-25">
            <ul
              class="nav nav-pills d-flex flex-row"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </li>
              <li class="nav-item px-3">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => LogoutUser()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
