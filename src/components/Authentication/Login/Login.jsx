import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-5 fw-bold ls-tight">
              The Testrig Dashboard <br />
              <span>for analysis and render the report</span>
            </h1>
            <p class="mb-4 opacity-70">
              A dashboard is a powerful tool for data analysis and report
              rendering, providing a visually intuitive platform to explore and
              present information. This brief introduction highlights its key
              role in simplifying complex data and facilitating insightful
              decision-making.
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
                    <label class="form-label" for="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={setpassword}
                    />
                    <label class="form-label" for="form3Example4">
                      Password
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
    </>
  );
}

export default Login;
