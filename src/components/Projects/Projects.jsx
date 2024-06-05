import { React, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { baseUrl } from "../utilities/config";
import DeleteAlertPopup from "../Alerts/DeleteAlertPopup";

function Projects() {
  let userID = localStorage.getItem("userID");
  const [project, setProject] = useState([]);

  const getProject = () => {
    fetch(`${baseUrl}/api/project/getproject/${userID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProject(data.projects));
  };
  useEffect(() => {
    getProject();
  }, []);

  const setProjectIdAndName = (projectID, projectName) => {
    localStorage.setItem("ProjectID", projectID);
    localStorage.setItem("ProjectName", projectName);
  };

  console.log(project);

  return (
    <>
      {/* create project button */}
      <div className="d-flex justify-content-end">
        <a
          href="/createproject"
          class="btn btn-outline-success my-2 my-sm-0 mr-4"
          type="submit"
        >
          Create Project
        </a>
      </div>

      {/* project card section */}
      <div className="vh-600 mt-5">
        <div class="container">
          <div class="row">
            {project.map((element) => (
              <div class="col-4 col-md-6 col-lg-4">
                <div class="card mb-3 ml-3">
                  <div class="card-body">
                    <div
                      class="border-bottom border-dark"
                      style={{ height: "100px" }}
                    >
                      <h5 class="card-title">{element.project_name}</h5>
                      <p class="card-text">{element.project_desc}</p>
                    </div>
                    <div class="border-bottom border-dark mt-3">
                      <div
                        class="d-flex justify-content-around"
                        style={{ width: "312px" }}
                      >
                        <p class="card-text">Test Cases</p>
                        <p class="card-text">Build Run</p>
                      </div>
                      <div
                        class="d-flex justify-content-around"
                        style={{ width: "312px" }}
                      >
                        <p class="card-text">12</p>
                        <p class="card-text">10</p>
                      </div>
                    </div>
                    <div className="mt-3 d-flex ml-5">
                      <div class="ml-5">
                        <a
                          href="/board"
                          class="btn btn-primary"
                          onClick={() =>
                            setProjectIdAndName(
                              element.project_id,
                              element.project_name
                            )
                          }
                        >
                          Click
                        </a>
                      </div>
                      <div class="ml-5">
                        <a href="/">
                          <DeleteAlertPopup />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* App Footer */}
      <div className="d-flex flex-column">
        <Footer />
      </div>
    </>
  );
}

export default Projects;
