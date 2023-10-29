import { React, useState, useEffect } from "react";

function Buildreport() {
  let BuildId = localStorage.getItem("BuildId");
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
    console.log(testArray);
  };

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
  useEffect(() => {
    getBuild();
  }, []);

  testBuild();

  return (
    <div className="ml-5 mb-5 w-100 px-2 h-full">
      {testArray.map((element) => (
        <div id="accordion" className="w-75 ml-5 mb-3">
          <div class="card">
            <div class="card-header">
              <div className="d-flex justify-content-start">
                <a
                  class="card-link"
                  data-toggle="collapse"
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

            <div
              id={element.testid}
              class="collapse show"
              data-parent="#accordion"
            >
              <div class="col-md-8">
                <div class="pb-3 bg-primary mt-3">
                  <div class="card-body">
                    <h7 class="card-subtitle"> Request Method :-</h7>
                    <br />
                    <h7 class="card-subtitle mb-2 text-muted">
                      Request Url:- {element.testurl}
                    </h7>
                  </div>
                </div>
                <table class="table table-hover text-start">
                  <thead>
                    <tr>
                      <th scope="col">Test Name</th>
                      <th scope="col">Pass</th>
                      <th scope="col">Fail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {element.testAssertions.map((element) => (
                      <tr>
                        <td>{element.Assertion}</td>
                        <td>{element.Status.pass}</td>
                        <td>{element.Status.fail}</td>
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
  );
}

export default Buildreport;
