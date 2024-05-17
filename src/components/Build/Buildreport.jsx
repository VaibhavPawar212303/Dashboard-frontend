import { React, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utilities/config";
function Buildreport() {
  const navigate = useNavigate();
  let BuildId = localStorage.getItem("BuildId");
  const [test, setTest] = useState([]);
  const [build, setBuild] = useState([]);
  let projectName = localStorage.getItem("ProjectName");
  const getBuild = () => {
    fetch(`${baseUrl}/api/build/getbuild/${BuildId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTest(data.Builds[0].build_data));

    fetch(`${baseUrl}/api/build/getbuild/${BuildId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBuild(data.Builds[0].build_data.tests));
  };

  useEffect(() => {
    getBuild();
  }, []);

  function testStatus(status) {
    if (status == "pass") {
      return <span class="badge badge-success">Pass</span>;
    } else {
      return <span class="badge badge-danger">Fail</span>;
    }
  }

  return (
    <>
      <div className="min-vh-100">
        <h1 className="d-flex display-6">{projectName.toUpperCase()}</h1>
        <h1 class="display-6 d-flex justify-content-start">{test.buildName}</h1>
        <p class="d-flex justify-content-start mb-5">
          Test Executed On :{new Date(test.buildStartedAt).toLocaleDateString()}
        </p>
        <div class="row mb-5 mr-5">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Request</h5>
                <p class="card-text">{test.totalAssertion}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card" style={{ backgroundColor: "#42bd8b" }}>
              <div class="card-body">
                <h5 class="card-title">Test Passed</h5>
                <p class="card-text">{test.totalPassAssertion}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card" style={{ backgroundColor: "#ff6347" }}>
              <div class="card-body">
                <h5 class="card-title">Test Failed</h5>
                <p class="card-text">{test.totalFailAssertion}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card" style={{ backgroundColor: "#FFBB28" }}>
              <div class="card-body">
                <h5 class="card-title">Test Skipped</h5>
                <p class="card-text">0</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          <div class="card w-50">
            <div class="card-header">
              <div className="d-flex justify-content-start">
                <a
                  class="card-link"
                  data-toggle="collapse"
                  role="button"
                  href="#test"
                >
                  <small>Test Executed</small>
                </a>
              </div>
            </div>
          </div>
        </p>
        <div className="mb-5 w-100 px-2" id="test">
          {build.map((test) => (
            <div>
              <p>
                <div class="card w-50" aria-expanded="false">
                  <div class="card-header">
                    <div className="d-flex justify-content-start">
                      <a
                        class="card-link"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        href={"#" + test.testid}
                      >
                        <small>{test.testname}</small>
                      </a>
                    </div>
                    <div className="d-flex  justify-content-end">
                      <span
                        class="badge"
                        style={{ backgroundColor: "#42bd8b" }}
                      >
                        Assertions Pass :- {test.totalAssertionPass}
                      </span>
                      <span
                        class="badge ml-3"
                        style={{ backgroundColor: "#ff6347" }}
                      >
                        Assertions Fail :- {test.totalAssertionFail}
                      </span>
                      <span
                        class="badge ml-3"
                        style={{ backgroundColor: "#FFBB28" }}
                      >
                        Test Status:- {testStatus(test.testStatus)}
                      </span>
                    </div>
                  </div>
                </div>
              </p>
              <div class="collapse w-50 card mb-2" id={test.testid}>
                <div
                  id={test.testid}
                  class="collapse show"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div class="col-md-8 w-100 ml-5">
                    <table class="table table-hover text-start">
                      <thead>
                        <tr>
                          <th scope="col">Test Name</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.assertions.map((element) => (
                          <tr>
                            <td>{element.assertion}</td>
                            <td>{testStatus(test.testStatus)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Buildreport;
