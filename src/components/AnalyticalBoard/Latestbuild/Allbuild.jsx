import { React, useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/config";
function Allbuild() {
  const navigate = useNavigate();
  let projectID = localStorage.getItem("ProjectID");
  const setBuildId = (id) => {
    //set build id
    localStorage.setItem("BuildId", id);
  };
  const [build, setBuild] = useState([]);
  const getBuild = () => {
    fetch(`${baseUrl}/api/build/getallbuild/${projectID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBuild(data.Builds));
  };
  useEffect(() => {
    getBuild();
  }, []);

  return (
    <div className="mr-5">
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
                <span class="badge" style={{ backgroundColor: "#42bd8b" }}>
                  {element.build_data.totalPassAssertion}
                </span>
              </td>
              <td>
                <span class="badge" style={{ backgroundColor: "#ff6347" }}>
                  {element.build_data.totalFailAssertion}
                </span>
              </td>
              <td>
                <a
                  href="/buildreport"
                  class="btn btn-outline-success mt-auto"
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
      <Footer />
    </div>
  );
}

export default Allbuild;
