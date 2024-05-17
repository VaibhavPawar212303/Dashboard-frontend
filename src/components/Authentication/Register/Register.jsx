import React from "react";
import "./Register.css";
import Navbar from "../../Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/config";


function Register() {
  const navigate = useNavigate();
  //pass data to db
  const passDataToDb = (event) => {
    event.preventDefault();
    setUsername(username);
    setEmail(email);
    setPassword(password);
    setCity(city);
    setphoneNo(phoneNo);
    axios({
      method: "post",
      url: `${baseUrl}/api/user/createUser`,
      data: {
        userName: username,
        EmailId: email,
        Password: password,
        City: city,
        PhoneNo: phoneNo,
      },
    }).then(function (res) {
      window.stop();
      setMessage(JSON.stringify(res.data.message));
      if (res.data.message === "Account Created Successfully") {
        window.stop();
        return navigate("/login", { replace: true });
      }
      window.stop();
    });
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const setUserName = (e) => {
    setUsername(e.target.value);
  };
  const setemail = (e) => {
    setEmail(e.target.value);
  };
  const setpassword = (e) => {
    setPassword(e.target.value);
  };
  const setphoneno = (e) => {
    setphoneNo(e.target.value);
  };
  const setcity = (e) => {
    setCity(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div class="form-bg mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-offset-3 col-md-6">
              <div class="form-container">
                <h3 class="title">Register</h3>
                <p class="sub-title">{message}</p>
                <form class="form-horizontal">
                  <div class="form-group">
                    <label>User Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User Name"
                      value={username}
                      onChange={setUserName}
                    />
                  </div>
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
                  <h4 class="sub-title">Personal Information</h4>
                  <div class="form-group">
                    <label>Phone No.</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone Number"
                      value={phoneNo}
                      onChange={setphoneno}
                    />
                  </div>
                  <div class="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="City"
                      value={city}
                      onChange={setcity}
                    />
                  </div>
                  <span class="signin-link">
                    Already have an account? Click here to{" "}
                    <a href="/login">Login</a>
                  </span>
                  <button class="btn signup" onClick={passDataToDb}>
                    Create Account
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

export default Register;
