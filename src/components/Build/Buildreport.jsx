import { React, useState, useEffect } from "react";

function Buildreport() {
  let BuildId = localStorage.getItem("BuildId");
  let numberofTestpass = 0;
  let numberofTestfail = 0;
  let numberofTestskip = 0;
  const getBuild = () => {
    fetch(
      `https://dappled-blog-api.onrender.com/api/build/getbuild/${BuildId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setTest(data.Builds[0].build_data.results));
  };
  const [test, setTest] = useState([]);

  const testArray = [];

  const testBuild = () => {
    for (var i = 0; i < test.length; i++) {
      let pass = 0;
      let fail = 0;
      let testobject, teststatus;

      var data = test[i].testPassFailCounts;

      var output = Object.entries(data).map(([Assertion, Status]) => ({
        Assertion,
        Status,
      }));

      for (var j = 0; j < output.length; j++) {
        if (output[j].Status.pass == 1) {
          pass++;
        } else {
          fail++;
        }
        if (output.length == pass) {
          teststatus = "pass";
        } else {
          teststatus = "fail";
        }

        testobject = {
          testid: test[i].id,
          testname: test[i].name,
          testurl: test[i].url,
          testStatus: teststatus,
          assertionPass: pass,
          assertionfail: fail,
          totalAssertions: output.length,
          testAssertions: output,
        };
      }

      testArray.push(testobject);
    }
  };

  useEffect(() => {
    getBuild();
  }, []);

  function numberOfTestPassedOrFail() {
    testArray.map((element) => {
      if (element.testStatus === "pass") {
        numberofTestpass++;
      } else if (element.testStatus === "fail") {
        numberofTestfail++;
      } else if (element.testStatus === "skip") {
        numberofTestskip++;
      }
    });
  }

  testBuild();
  numberOfTestPassedOrFail();

  function testStatus(status) {
    if (status.pass == 1) {
      return <span class="badge badge-success">Pass</span>;
    } else {
      return <span class="badge badge-danger">Fail</span>;
    }
  }

  return (
    <>
      <div class="row mb-5 mr-5">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Request</h5>
              <p class="card-text">{testArray.length}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card bg-success">
            <div class="card-body">
              <h5 class="card-title">Test Passed</h5>
              <p class="card-text">{numberofTestpass}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card bg-danger">
            <div class="card-body">
              <h5 class="card-title">Test Failed</h5>
              <p class="card-text">{numberofTestfail}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card bg-warning">
            <div class="card-body">
              <h5 class="card-title">Test Skipped</h5>
              <p class="card-text">{numberofTestskip}</p>
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
        {testArray.map((element) => (
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
                      href={"#" + element.testid}
                    >
                      <small>{element.testname}</small>
                    </a>
                  </div>

                  <div className="d-flex  justify-content-end">
                    <span class="badge badge-success">
                      Pass :- {element.assertionPass}
                    </span>
                    <span class="badge badge-danger ml-3">
                      Fail :- {element.assertionfail}
                    </span>
                    <span class="badge badge-warning ml-3">
                      Test Status:- {element.testStatus}
                    </span>
                  </div>
                </div>
              </div>
            </p>
            <div class="collapse w-50 card mb-2" id={element.testid}>
              <div
                id={element.testid}
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
                      {element.testAssertions.map((element) => (
                        <tr>
                          <td>{element.Assertion}</td>
                          <td>{testStatus(element.Status)}</td>
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
    </>
  );
}

export default Buildreport;
