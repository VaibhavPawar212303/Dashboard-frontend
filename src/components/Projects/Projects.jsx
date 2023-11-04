import { React, useState, useEffect } from "react";
import Footer from "../Footer/Footer";

function Projects() {
  let userID = localStorage.getItem("userID");
  const [project, setProject] = useState([]);

  const getProject = () => {
    fetch(
      `https://dashboard-api-backhend-production.up.railway.app/api/project/getproject/${userID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
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
      <div class="row">
        <div className="d-flex justify-content-end">
          <a
            href="/createproject"
            class="btn btn-outline-success my-2 my-sm-0 mr-3"
            type="submit"
          >
            Create Project
          </a>
        </div>
        <div className="vh-100">
          <div class="col-sm-6 d-flex">
            {project.map((element) => (
              <div class="card w-50 mb-3 ml-3">
                <div class="card-body">
                  <h5 class="card-title">{element.project_name}</h5>
                  <p class="card-text">{element.project_desc}</p>
                </div>
                <div className="mb-3">
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
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Projects;
