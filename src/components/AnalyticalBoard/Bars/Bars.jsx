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
} from "recharts";

function Bars() {
  let projectID = localStorage.getItem("ProjectID");
  const [build, setBuild] = useState([]);
  const data = [];

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
  for (let i = 0; i < build.length; i++) {
    let testdata = {
      date:new Date (build[i].build_data.buildStartedAt).toLocaleDateString(),
      testPass: build[i].build_data.totalPassAssertion,
      testFail: build[i].build_data.totalFailAssertion,
    };
    data.push(testdata);
  }

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
            <Bar dataKey="testPass" fill="#82ca9d" minPointSize={5}></Bar>
            <Bar dataKey="testFail" fill="#ff6347" minPointSize={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Bars;
