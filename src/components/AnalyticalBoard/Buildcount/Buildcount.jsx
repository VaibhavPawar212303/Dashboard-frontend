import { React, useEffect, useState } from "react";
import "../Buildcount/Buildcount.css";

function Buildcount() {
  let numberOfBuildPass = 0;
  let numberOfBuildFail = 0;
  let numberOfBuildSkip = 0;
  let projectID = localStorage.getItem("ProjectID");
  const [build, setBuild] = useState([]);

  const getBuild = () => {
    fetch(
      `https://dappled-blog-api.onrender.com/api/build/getallbuild/${projectID}`,
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

  const buildArray = [];

  const testBuild = () => {
    let buildStatus;
    let testobject;
    for (var i = 0; i < build.length; i++) {
      const testArray = [];
      let buildPassCount = 0;
      let buildFailCount = 0;
      for (var j = 0; j < build[i].build_data.results.length; j++) {
        let pass = 0;
        let fail = 0;
        let teststatus;
        var data = build[i].build_data.results[j].testPassFailCounts;
        var output = Object.entries(data).map(([Assertion, Status]) => ({
          Assertion,
          Status,
        }));
        for (var k = 0; k < output.length; k++) {
          if (output[k].Status.pass == 1) {
            pass++;
          } else {
            fail++;
          }
          if (output.length == pass) {
            teststatus = "pass";
          } else {
            teststatus = "fail";
          }
        }
        testobject = {
          testid: build[i].build_data.id,
          testname: build[i].build_data.name,
          assertionPass: pass,
          assertionfail: fail,
          teststatus: teststatus,
          totalAssertions: output.length,
          testAssertions: output,
        };
        testArray.push(testobject);
      }
      for (var k = 0; k < testArray.length; k++) {
        if (testArray[k].teststatus == "pass") {
          buildPassCount++;
        } else {
          buildFailCount++;
        }
        if (testArray.length == buildPassCount) {
          buildStatus = "pass";
        } else {
          buildStatus = "fail";
        }
      }

      buildArray.push({
        buildId: `${build[i].buildid}`,
        buildStatus: buildStatus,
        testArray,
      });
    }
  };

  useEffect(() => {
    getBuild();
  }, []);

  function numberOfTestPassedOrFail() {
    buildArray.map((element) => {
      if (element.buildStatus === "pass") {
        numberOfBuildPass++;
      } else if (element.testStatus === "fail") {
        numberOfBuildFail++;
      } else if (element.testStatus === "skip") {
        numberOfBuildSkip++;
      }
    });
  }

  testBuild();
  numberOfTestPassedOrFail();

  return (
    <div class="d-flex demo-card flex-row row ml-5">
      <div class="card border-info mx-sm-1 p-3 w-25 mt-3 col">
        <div class="card border-info shadow text-info p-3 my-card">
          <span class="bi bi-boxes" aria-hidden="true"></span>
        </div>
        <div class="text-info text-center mt-4">
          <h4>Builds Executed</h4>
        </div>
        <div class="text-info text-center mt-2">
          <h1>{build.length}</h1>
        </div>
      </div>
      <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-success col">
        <div class="card border-info shadow text-info p-3 my-card">
          <span class="bi bi-pass-fill" aria-hidden="true"></span>
        </div>
        <div class="text-info text-center mt-4 text-white">
          <h4>Builds Passed</h4>
        </div>
        <div class="text-info text-center mt-2 text-white">
          <h1>{numberOfBuildPass}</h1>
        </div>
      </div>
      <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-danger col">
        <div class="card border-info shadow text-info p-3 my-card">
          <span class="bi bi-bookmark" aria-hidden="true"></span>
        </div>
        <div class="text-info text-center mt-4 text-white">
          <h4>Builds Failed</h4>
        </div>
        <div class="text-info text-center mt-2 text-white">
          <h1>{numberOfBuildFail}</h1>
        </div>
      </div>
      <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-warning col">
        <div class="card border-info shadow text-info p-3 my-card">
          <span class="bi bi-box-arrow-down-right" aria-hidden="true"></span>
        </div>
        <div class="text-info text-center mt-4 text-white">
          <h4>Builds Skipped</h4>
        </div>
        <div class="text-info text-center mt-2 text-white">
          <h1>{numberOfBuildSkip}</h1>
        </div>
      </div>
    </div>
  );
}

export default Buildcount;
