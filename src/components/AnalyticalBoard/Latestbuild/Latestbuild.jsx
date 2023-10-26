import { React, useEffect, useState } from "react";

function Latestbuild() {
  let projectID = localStorage.getItem("ProjectID");
  const setBuildId = (id) => {
    //set build id
    localStorage.setItem("BuildId", id);
  };
  const [build, setBuild] = useState([]);
  const getBuild = () => {
    fetch(`https://dappled-blog-api.onrender.com/api/build/getallbuild/${projectID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBuild(data.Builds));
  };
  useEffect(() => {
    getBuild();
  }, []);

  return (
    <div>
      <h4 className="mb-3 mt-3">Build Executed</h4>
      <table class="table">
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
              <td>{element.build_data.startedAt}</td>
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
  );
}

export default Latestbuild;
