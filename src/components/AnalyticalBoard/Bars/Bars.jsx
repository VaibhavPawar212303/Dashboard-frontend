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

  build.forEach((element) => {
    let testdata = {
      date: new Date(element.build_data.buildStartedAt).toLocaleDateString(),
      Pass: element.build_data.totalPassAssertion,
      Fail: element.build_data.totalFailAssertion,
    };
    data.push(testdata);
  });

  let reverseArray = data.reverse();

  let updateArray = new Array(
    reverseArray[5],
    reverseArray[4],
    reverseArray[3],
    reverseArray[2],
    reverseArray[1],
    reverseArray[0]
  );

  return (
    <div>
      <p>Test Executed</p>
      <div className="BarData">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={updateArray}
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
            <Bar dataKey="Pass" fill="#82ca9d" minPointSize={5}></Bar>
            <Bar dataKey="Fail" fill="#ff6347" minPointSize={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Bars;
