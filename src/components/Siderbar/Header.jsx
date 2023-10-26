function Header() {
  const LogoutUser = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  };
  return (
    <div>
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="/" class="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="/latestblog" class="nav-link">
             Blogs
            </a>
          </li>
          <li class="nav-item">
            <a href="/editor" class="nav-link">
              Create Blog
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onClick={LogoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
