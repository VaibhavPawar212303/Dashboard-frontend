import { React, useState, useEffect } from "react";
import "../Bars/Bars.css";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

function Piechart() {
  const data = [];
  let projectID = localStorage.getItem("ProjectID");
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
      .then((data) => setBuild(data.Builds[data.Builds.length - 1].build_data));
  };

  useEffect(() => {
    getBuild();
  }, []);

  const testStatusArray = ["Passed", "Fail", " Skip"];
  data.push(
    { name: testStatusArray[0], value: build.totalPassAssertion },
    { name: testStatusArray[1], value: build.totalFailAssertion },
    { name: testStatusArray[2], value: 0 }
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
        <ResponsiveContainer width="100%" height="132%">
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
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
