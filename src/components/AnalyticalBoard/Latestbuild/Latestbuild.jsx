import { React, useEffect, useState } from "react";

function Latestbuild() {
  let projectID = localStorage.getItem("ProjectID");
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

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray font-medium">Build Executed</strong>
      <div className="mt-3">
        <table class="w-full">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Build Name</th>
              <th scope="col">Build Start At</th>
              <th scope="col">Build Status</th>
              <th scope="col">Check Build</th>
            </tr>
          </thead>
          {build.map((element) => (
            <tbody>
              <tr>
                <td>{element.build_data.name}</td>
                <td>{new Date(element.build_data.startedAt).toLocaleDateString()}</td>
                <td>{element.status}</td>
                <td>
                  <a
                    href="/buildreport"
                    class="btn btn-primary mt-auto"
                    onClick={setBuildId(element.buildid)}
                  >
                    Check
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Latestbuild;
