import { React, useEffect, useState } from "react";
import "../Buildcount/Buildcount.css";
import { baseUrl } from "../../../utilities/config";

function Buildcount() {
  let projectID = localStorage.getItem("ProjectID");
  let projectName = localStorage.getItem("ProjectName");
  const getBuild = () => {
    fetch(`${baseUrl}/api/build/getallbuild/${projectID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTest(data.Builds[data.Builds.length - 1].build_data));
  };
  const [test, setTest] = useState([]);

  useEffect(() => {
    getBuild();
  }, []);

  return (
    <div>
      <h1 className="d-flex display-6">{projectName.toUpperCase()}</h1>
      <div>
        <h4 className="mb-3 mt-3">Latest Test Executed</h4>
        <div class="d-flex demo-card flex-row row ml-5">
          <div class="card border-info mx-sm-1 p-3 w-25 mt-3 col">
            <div class="text-info text-center mt-4">
              <h4>Tests Executed</h4>
            </div>
            <div class="text-info text-center mt-2">
              <h1>{test.totalAssertion}</h1>
            </div>
          </div>
          <div
            class="card border-info mx-sm-1 p-3 w-25 mt-3 col"
            style={{ backgroundColor: "#42bd8b" }}
          >
            <div class="text-info text-center mt-4 text-white">
              <h4>Tests Passed</h4>
            </div>
            <div class="text-info text-center mt-2 text-white">
              <h1>{test.totalPassAssertion}</h1>
            </div>
          </div>
          <div
            class="card border-info mx-sm-1 p-3 w-25 mt-3  col"
            style={{ backgroundColor: "#ff6347" }}
          >
            <div class="text-info text-center mt-4 text-white">
              <h4>Tests Failed</h4>
            </div>
            <div class="text-info text-center mt-2 text-white">
              <h1>{test.totalFailAssertion}</h1>
            </div>
          </div>
          <div
            class="card border-info mx-sm-1 p-3 w-25 mt-3 col"
            style={{ backgroundColor: "#FFBB28" }}
          >
            <div class="text-info text-center mt-4 text-white">
              <h4>Tests Skipped</h4>
            </div>
            <div class="text-info text-center mt-2 text-white">
              <h1>0</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buildcount;
