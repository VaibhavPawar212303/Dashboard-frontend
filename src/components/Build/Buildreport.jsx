import { React, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
function Buildreport() {
  const navigate = useNavigate();
  let BuildId = localStorage.getItem("BuildId");
  const [test, setTest] = useState([]);
  const [build, setBuild] = useState([]);
  const getBuild = () => {
    fetch(
      `https://dashboard-api-backhend-production.up.railway.app/api/build/getbuild/${BuildId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setTest(data.Builds[0].build_data));

    fetch(
      `https://dashboard-api-backhend-production.up.railway.app/api/build/getbuild/${BuildId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
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
        <div className="d-flex justify-content-end px-5">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              ></path>
            </svg>
            Previous...
          </button>
        </div>
        <h1 class="display-6 d-flex justify-content-start">
          Test Name :- {test.buildName}
        </h1>
        <p class="d-flex justify-content-start mb-5">
          Test Executed On :-{" "}
          {new Date(test.buildStartedAt).toLocaleDateString()}
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
            <div class="card bg-success">
              <div class="card-body">
                <h5 class="card-title">Test Passed</h5>
                <p class="card-text">{test.totalPassAssertion}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card bg-danger">
              <div class="card-body">
                <h5 class="card-title">Test Failed</h5>
                <p class="card-text">{test.totalFailAssertion}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card bg-warning">
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
                      <span class="badge badge-success">
                        Assertions Pass :- {test.totalAssertionPass}
                      </span>
                      <span class="badge badge-danger ml-3">
                        Assertions Fail :- {test.totalAssertionFail}
                      </span>
                      <span class="badge badge-warning ml-3">
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
