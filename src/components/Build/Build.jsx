import { React, useState, useEffect } from "react";
import "../Build/Build.css";
function Build() {
  let projctID = localStorage.getItem("ProjectID");
  const [build, setBuild] = useState([]);
  let builds = [];
  const getBuild = () => {
    fetch(`https://dappled-blog-api.onrender.com/api/build/getbuild/${projctID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBuild(data.builds));
  };
  useEffect(() => {
    getBuild();
  }, []);

  build.forEach((element) => {
    builds.push(element.BuildData);
  });
  return (
    <div>
      <div class="row mb-5 ml-5 w-100">
        {build.map((element) => (
          <div class="cardbox ml-3 h-75">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Build Id:- {element.BuildID}</h5>
            </div>
            <small>Build start:-{element.buildStart_AT}</small>
            <br />
            <small>Build end:-{element.buildEnd_AT}</small>
            <br />
            <div>
              <span class="mr-2 badge badge-success">
                Total Tests :- {element.totalTests}
              </span>
              <span class="mr-2 badge badge-danger">
                Total Tests Failed :- {element.testFailed}
              </span>
              <span class="badge badge-warning">
                Total Tests Skipped :- {element.testSkipped}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Build;
