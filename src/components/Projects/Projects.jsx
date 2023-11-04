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

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-end">
        <a
          href="/createproject"
          class="btn btn-outline-success my-2 my-sm-0 mr-3"
          type="submit"
        >
          Create Project
        </a>
      </div>
      <div class="row mb-5 w-25 vh-100">
        {project.map((element) => (
          <div>
            <div class="card bg-light mb-3" key={element.ProjectID}>
              <h5 class="card-title mt-3">{element.project_name}</h5>
              <div class="card-body">
                <div class="card-header mb-3">{element.project_desc}</div>
                <a
                  href="/board"
                  class="btn btn-primary mt-auto mt-3"
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
          </div>
        ))}
      </div>
      <div className="d-flex flex-column">
        <Footer />
      </div>
    </div>
  );
}

export default Projects;
