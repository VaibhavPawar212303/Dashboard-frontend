import { React, useEffect, useState } from "react";

function Latestbuild() {
  let projectID = localStorage.getItem("ProjectID");
  let numberOfBuildPass = 0;
  let numberOfBuildFail = 0;
  let numberOfBuildSkip = 0;
  const buildArray = [];
  const setBuildId = (id) => {
    //set build id
    localStorage.setItem("BuildId", id);
  };
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
  useEffect(() => {
    getBuild();
  }, []);

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
        buildName: build[i].build_data.name,
        buildStartAt: build[i].build_data.timestamp,
        buildStatus: buildStatus,
        testpass: buildPassCount,
        testfail: buildFailCount,
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

  console.log(buildArray);
  return (
    <div>
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
        {buildArray.map((element) => (
          <tbody>
            <tr>
              <td>{element.buildName}</td>
              <td>{new Date(element.buildStartAt).toLocaleDateString()}</td>
              <td>{element.buildStatus.toUpperCase()}</td>
              <td>
                <span class="badge badge-success">{element.testpass}</span>
              </td>
              <td>
                <span class="badge badge-danger">{element.testfail}</span>
              </td>
              <td>
                <a
                  href="/buildreport"
                  class="btn btn-primary mt-auto"
                  onClick={() => {
                    setBuildId(element.buildId);
                  }}
                >
                  Test Details
                </a>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Latestbuild;
