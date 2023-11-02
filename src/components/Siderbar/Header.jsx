function Header() {
  const LogoutUser = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  };
  return (
    <div className="mb-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div class="container">
          <a class="navbar-brand" href="/">
            Testrig Analytical Dashboard
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item px-2">
                <a class="btn btn-dark" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="btn btn-dark" href="/login" onClick={() => LogoutUser()}>
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
