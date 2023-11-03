import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const LogoutUser = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login");
  };
  return (
    <div className="mb-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-5 bg-body-tertiary">
        <div className="px-5">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              ></path>
            </svg>
            Back
          </button>
        </div>
        <div class="container d-flex justify-content-center">
          <a class="navbar-brand" href="/">
            <h3> Testrig Automation Dashboard</h3>
          </a>
        </div>
        <div className="d-flex justify-content-center w-25">
          <ul
            class="nav nav-pills mb-3 d-flex flex-row"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-home-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="pills-home"
                aria-selected="false"
                onClick={() => navigate("/")}
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/login"
                id="pills-profile-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                onClick={() => LogoutUser()}
              >
                logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
