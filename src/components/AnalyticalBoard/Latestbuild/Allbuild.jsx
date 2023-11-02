import { React, useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";

function Allbuild() {
  const navigate = useNavigate();
  let projectID = localStorage.getItem("ProjectID");
  const setBuildId = (id) => {
    //set build id
    localStorage.setItem("BuildId", id);
  };
  const [build, setBuild] = useState([]);
  const getBuild = () => {
    fetch(
      `https://dashboard-api-backhend-production.up.railway.app/api/build/getallbuild/${projectID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setBuild(data.Builds));
  };
  useEffect(() => {
    getBuild();
  }, []);

  return (
    <div className="mr-5">
      <div className="d-flex justify-content-end px-5">
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
          Previous...
        </button>
      </div>
      <h4 className="mb-3 mt-3">Build Executed</h4>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Test Name</th>
            <th scope="col">Test Executed</th>
            <th scope="col">Test Status</th>
            <th scope="col">Tests Pass</th>
            <th scope="col">Tests Fail</th>
            <th scope="col">Check Tests</th>
          </tr>
        </thead>
        {build.reverse().map((element) => (
          <tbody>
            <tr>
              <td>{element.build_data.buildName}</td>
              <td>
                {new Date(
                  element.build_data.buildStartedAt
                ).toLocaleDateString()}
              </td>
              <td>{element.build_data.buildStatus.toUpperCase()}</td>
              <td>
                <span class="badge badge-success">
                  {element.build_data.totalPassAssertion}
                </span>
              </td>
              <td>
                <span class="badge badge-danger">
                  {element.build_data.totalFailAssertion}
                </span>
              </td>
              <td>
                <a
                  href="/buildreport"
                  class="btn btn-primary mt-auto"
                  onClick={() => {
                    setBuildId(element.buildid);
                  }}
                >
                  Test Details
                </a>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Footer/>
    </div>
  );
}

export default Allbuild;
