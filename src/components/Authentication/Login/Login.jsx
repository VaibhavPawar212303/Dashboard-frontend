import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Testrig-logo-white.svg";
import Footer from "../../Footer/Footer";

function Login() {
  const navigate = useNavigate();
  //pass data to db
  const passDataToDb = (event) => {
    event.preventDefault();
    setEmail(email);
    setPassword(password);
    axios({
      method: "post",
      url: "https://dashboard-api-backhend-production.up.railway.app/api/user/loginUser",
      data: {
        EmailId: email,
        Password: password,
      },
    }).then(function (res) {
      window.stop();
      if (res.data.user) {
        console.log(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user.user_id);
        return navigate("/", { replace: true });
      } else {
        window.stop();
        setMessage(JSON.stringify(res.data.message));
      }
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const setemail = (e) => {
    setEmail(e.target.value);
  };
  const setpassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div class="container-fluid w-full">
        <div class="row flex-nowrap">
          <div
            class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success"
            // style={{ backgroundColor: "#5dda83" }}
          >
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span class="fs-5 d-none d-sm-inline">
                  <img src={logo} width={150} height={50} />
                </span>
              </a>
              <hr />
            </div>
          </div>
          <div class="col py-3">
            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body-tertiary">
              <div class="container d-flex justify-content-center">
                <a class="navbar-brand" href="/">
                  <h3 style={{ color: "green" }}>
                    TESTRIG Automation Dashboard
                  </h3>
                </a>
              </div>
            </nav>
            <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
              <div class="row gx-lg-5 align-items-center mb-5">
                <div class="col-lg-6 mb-5 mb-lg-0">
                  <h1 class="my-5 display-5 fw-bold ls-tight">
                    The TESTRIG Dashboard <br />
                    <span>for analysis and render the report</span>
                  </h1>
                  <p class="mb-4 opacity-70">
                    A dashboard is a powerful tool for data analysis and report
                    rendering, providing a visually intuitive platform to
                    explore and present information. This brief introduction
                    highlights its key role in simplifying complex data and
                    facilitating insightful decision-making.
                  </p>
                </div>
                <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                  <div
                    id="radius-shape-1"
                    class="position-absolute rounded-circle shadow-5-strong"
                  ></div>
                  <div
                    id="radius-shape-2"
                    class="position-absolute shadow-5-strong"
                  ></div>
                  <div class="card bg-glass">
                    <div class="card-body px-4 py-5 px-md-5">
                      <form>
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                        <p class="text-black-100 mb-5">
                          Please enter your login and password!
                        </p>
                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={setemail}
                          />
                        </div>
                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={setpassword}
                          />
                        </div>
                        <div id="form-login-remember" class="input-group mb-1">
                          <input
                            id="remember"
                            class="input-field"
                            name="remember"
                            type="checkbox"
                            value="yes"
                            alt="Remember me"
                          />
                          <label for="remember" className="ml-2 mb-1">
                            Remember me
                          </label>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary btn-block mb-4"
                          onClick={passDataToDb}
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
