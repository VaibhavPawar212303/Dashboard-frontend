import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function LoginPage() {
  const notifyError = (msg) => {
    toast.error(msg);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      notifyError("Please add a valid email");
      return;
    }
    if (!password) {
      notifyError("Please fill in the password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8084/api/login", {
        emailAddress: email,
        password: password,
      });

      if (response.status === 200) {
        notifySuccess("Successfully Logged in");
        // Handle success (e.g., redirect to another page or save token)
      } else {
        notifyError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      notifyError("Network error: " + error.message);
      console.error("Fetch error: ", error);
    }
  };

  return (
    <div className="container">
      <div className="bg-white lg:w-1/4 sm:1/4 px-8 py-8">
        <div>
          <div className="logo w-100">
            <img
              src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
              alt="Logo"
            />
          </div>
          <div className="Form mt-4 flex flex-col items-center">
            <div>
              <h2 className="font-bold">Login into your account</h2>
            </div>
            <div>
              <form action="" className="login_form" onSubmit={handleSubmit}>
                <input
                  className="mt-4  w-5/4 p-2 border-2 border-black rounded-sm"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email Address"
                ></input>

                <input
                  className=" mt-4 p-2 w-5/4 border-2 border-black rounded-sm"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                ></input>

                <span className="mt-1 text-right font-normal">
                  Forgot Password?
                </span>
                <button
                  className="mt-4 p-2 bg-green-500 rounded-sm font-bold"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
            <div>
              <Link to={"/sign-up"}>
                <h3 className="mt-6">Don't have account? Sign Up</h3>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
}

export default LoginPage;
