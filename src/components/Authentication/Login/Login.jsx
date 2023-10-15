import { React, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  //pass data to db
  const passDataToDb = () => {
    setEmail(email);
    setPassword(password);
    axios({
      method: "post",
      url: "https://dappled-blog-api.onrender.com/api/user/loginUser",
      data: {
        EmailId: email,
        Password: password,
      },
    }).then(function (res) {
      window.stop();
      console.log(res);
      if (res.data.user) {
        localStorage.setItem("token", res.data.user.token);
        localStorage.setItem("userID", res.data.user.userID);
       
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
      <Navbar />
      <div class="form-bg mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-offset-3 col-md-6">
              <div class="form-container">
                <h3 class="title">Login</h3>
                <p class="sub-title">{message}</p>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label>Email ID</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={setemail}
                    />
                  </div>
                  <div class="form-group"></div>
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={setpassword}
                    />
                  </div>
                  <div class="form-group"></div>
                  <button class="btn signup" onClick={passDataToDb}>
                    Login
                  </button>
                  <span class="signin-link">
                    To Create New Account ? Click here to{" "}
                    <a href="/register">Register</a>
                  </span>
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
