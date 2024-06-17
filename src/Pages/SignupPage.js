import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";

function SignupPage() {
  const notifyError = (msg) => {
    toast.error(msg);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [countryName, setCountryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      console.log("empty");
      notifyError("Please add a valid email");
    }
    if (!password) {
      notifyError("please fill the password");
    }
    if (!firstName) {
      notifyError("please fill the firstName");
    }
    if (!lastName) {
      notifyError("please fill the lastName");
    }
    if (!companyName) {
      notifyError("please fill the companyName");
    }
    if (!countryName) {
      notifyError("please fill the countryName");
    }

    if (
      emailRegex.test(email) &&
      password &&
      firstName &&
      lastName &&
      companyName &&
      countryName
    ) {
      const response = await fetch("http://localhost:8084/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({
          emailAddress: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          companyName: companyName,
          contryName: countryName,
        }),
      });
      if (response.ok) {
        notifySuccess("Successfully Registerd");
      } else {
        console.log("Somthing went wrong");
      }
    }
  };

  return (
    <div className="container">
      <div className="bg-white lg:w-2/4 sm:1/4 px-8 py-8">
        <div className="logo w-100 mt-5">
          <img
            src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="m-4">
            <h2>Get Started</h2>
          </div>
          <div className="grow">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-grow">
                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="text"
                  placeholder="First Name*"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>

                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name*"
                ></input>
              </div>
              <div className="flex flex-row">
                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name*"
                ></input>

                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address*"
                ></input>
              </div>
              <div className="flex flex-row">
                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password*"
                ></input>

                <input
                  className="m-4  sm:w-5/4 lg:w-11/10 p-2 border-2 border-black rounded-sm"
                  type="text"
                  id="countryName"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="Country Name*"
                ></input>
              </div>
              <div className="flex flex-row justify-center mb-5">
                <button
                  className="mt-4 pt-4 pb-4 pl-10 pr-10 bg-green-400 rounded-sm font-bold"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center mb-5">
            <h3>By creating account, you agree to Testrig </h3>
            <h4>terms of Use and Privacy Policy</h4>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
}

export default SignupPage;
