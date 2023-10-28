import { React, useState, useEffect } from "react";
import "../Bars/Bars.css";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

function Piechart() {
  const data = [];
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
      } else if (element.buildStatus === "fail") {
        numberOfBuildFail++;
      } else {
        numberOfBuildSkip++;
      }
    });
  }
  testBuild();
  numberOfTestPassedOrFail();
  const testStatusArray = ["TestPassed", "TestFail", "TestSkip"];
  data.push(
    { name: testStatusArray[0], value: numberOfBuildPass },
    { name: testStatusArray[1], value: numberOfBuildFail },
    { name: testStatusArray[2], value: numberOfBuildSkip }
  );
  const COLORS = ["#00C49F", "#ff6347", "#FFBB28"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <p className="mb-5 ml-5">Test Executed Percentage</p>
      <div className="Piechart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Piechart;
