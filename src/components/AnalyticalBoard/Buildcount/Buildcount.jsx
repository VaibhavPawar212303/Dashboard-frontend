import { React, useEffect, useState } from "react";
import "../Buildcount/Buildcount.css";

function Buildcount() {
  // let numberOfBuildPass = 0;
  // let numberOfBuildFail = 0;
  // let numberOfBuildSkip = 0;
  let projectID = localStorage.getItem("ProjectID");
  // const [build, setBuild] = useState([]);
  // const getBuild = () => {
  //   fetch(
  //     `https://dappled-blog-api.onrender.com/api/build/getallbuild/${projectID}`,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       method: "GET",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setBuild(data.Builds));
  // };
  //const buildArray = [];
  // const testBuild = () => {
  //   let buildStatus;
  //   let testobject;
  //   for (var i = 0; i < build.length; i++) {
  //     const testArray = [];
  //     let buildPassCount = 0;
  //     let buildFailCount = 0;
  //     for (var j = 0; j < build[i].build_data.results.length; j++) {
  //       let pass = 0;
  //       let fail = 0;
  //       let teststatus;
  //       var data = build[i].build_data.results[j].testPassFailCounts;
  //       var output = Object.entries(data).map(([Assertion, Status]) => ({
  //         Assertion,
  //         Status,
  //       }));
  //       for (var k = 0; k < output.length; k++) {
  //         if (output[k].Status.pass == 1) {
  //           pass++;
  //         } else {
  //           fail++;
  //         }
  //         if (output.length == pass) {
  //           teststatus = "pass";
  //         } else {
  //           teststatus = "fail";
  //         }
  //       }
  //       testobject = {
  //         testid: build[i].build_data.id,
  //         testname: build[i].build_data.name,
  //         assertionPass: pass,
  //         assertionfail: fail,
  //         teststatus: teststatus,
  //         totalAssertions: output.length,
  //         testAssertions: output,
  //       };
  //       testArray.push(testobject);
  //     }
  //     for (var k = 0; k < testArray.length; k++) {
  //       if (testArray[k].teststatus == "pass") {
  //         buildPassCount++;
  //       } else {
  //         buildFailCount++;
  //       }
  //       if (testArray.length == buildPassCount) {
  //         buildStatus = "pass";
  //       } else {
  //         buildStatus = "fail";
  //       }
  //     }

  //     buildArray.push({
  //       buildId: `${build[i].buildid}`,
  //       buildStatus: buildStatus,
  //       testArray,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getBuild();
  // }, []);
  // function numberOfTestPassedOrFail() {
  //   buildArray.map((element) => {
  //     if (element.buildStatus === "pass") {
  //       numberOfBuildPass++;
  //     } else if (element.testStatus === "fail") {
  //       numberOfBuildFail++;
  //     } else if (element.testStatus === "skip") {
  //       numberOfBuildSkip++;
  //     }
  //   });
  // }
  // testBuild();
  // numberOfTestPassedOrFail();
  //let BuildId = localStorage.getItem("BuildId");

  let numberofTestpass = 0;
  let numberofTestfail = 0;
  let numberofTestskip = 0;
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
      .then((data) =>
        setTest(data.Builds[data.Builds.length - 1].build_data.results)
      );
  };
  const [test, setTest] = useState([]);
  const testArray = [];
  const testBuild = () => {
    for (var i = 0; i < test.length; i++) {
      let pass = 0;
      let fail = 0;
      let testobject, teststatus;
      var data = test[i].testPassFailCounts;
      var output = Object.entries(data).map(([Assertion, Status]) => ({
        Assertion,
        Status,
      }));
      for (var j = 0; j < output.length; j++) {
        if (output[j].Status.pass == 1) {
          pass++;
        } else {
          fail++;
        }
        if (output.length == pass) {
          teststatus = "pass";
        } else {
          teststatus = "fail";
        }
        testobject = {
          testid: test[i].id,
          testname: test[i].name,
          testurl: test[i].url,
          testStatus: teststatus,
          assertionPass: pass,
          assertionfail: fail,
          totalAssertions: output.length,
          testAssertions: output,
        };
      }
      testArray.push(testobject);
    }
  };
  useEffect(() => {
    getBuild();
  }, []);

  function numberOfTestPassedOrFail() {
    testArray.map((element) => {
      if (element.testStatus === "pass") {
        numberofTestpass++;
      } else if (element.testStatus === "fail") {
        numberofTestfail++;
      } else if (element.testStatus === "skip") {
        numberofTestskip++;
      }
    });
  }
  testBuild();
  numberOfTestPassedOrFail();
  return (
    <div>
      <h4 className="mb-3 mt-3"> Latest Build Executed</h4>
      <div class="d-flex demo-card flex-row row ml-5">
        <div class="card border-info mx-sm-1 p-3 w-25 mt-3 col">
          <div class="text-info text-center mt-4">
            <h4>Tests Executed</h4>
          </div>
          <div class="text-info text-center mt-2">
            <h1>{testArray.length}</h1>
          </div>
        </div>
        <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-success col">
          <div class="text-info text-center mt-4 text-white">
            <h4>Tests Passed</h4>
          </div>
          <div class="text-info text-center mt-2 text-white">
            <h1>{numberofTestpass}</h1>
          </div>
        </div>
        <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-danger col">
          <div class="text-info text-center mt-4 text-white">
            <h4>Tests Failed</h4>
          </div>
          <div class="text-info text-center mt-2 text-white">
            <h1>{numberofTestfail}</h1>
          </div>
        </div>
        <div class="card border-info mx-sm-1 p-3 w-25 mt-3 bg-warning col">
          <div class="text-info text-center mt-4 text-white">
            <h4>Tests Skipped</h4>
          </div>
          <div class="text-info text-center mt-2 text-white">
            <h1>{numberofTestskip}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buildcount;
