import { React, useState, useEffect } from "react";
import "../Bars/Bars.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function Bars() {
  const data = [];
  const dataArray = [];
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

  for (let i = 0; i < buildArray.length; i++) {
    const buildCount = numberOfBuildPass;
    const date = new Date(buildArray[i].buildStartAt).toLocaleDateString();
    const tests = buildArray[i].testArray.length;
    const testPass = buildArray[i].testpass;
    const testFail = buildArray[i].testfail;
    const buildData = {
      date: date,
      tests: tests,
      testPass: testPass,
      testFail: testFail,
    };
    dataArray.push(buildData);
  }

  data.push(dataArray[dataArray.length - 1]);

  return (
    <div>
      <p>Test Executed</p>
      <div className="BarData">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tests" fill="#338fff" minPointSize={5} />
            <Bar dataKey="testPass" fill="#82ca9d" minPointSize={5}></Bar>
            <Bar dataKey="testFail" fill="#ff6347" minPointSize={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Bars;
