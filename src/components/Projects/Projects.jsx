import { React, useState, useEffect } from "react";

function Projects() {
  let userID = localStorage.getItem("userID");
  const [project, setProject] = useState([]);
  const getProject = () => {
    fetch(`https://dappled-blog-api.onrender.com/api/project/getproject/${userID}`, {
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

  const setProjectId = (projectID) => {
    localStorage.setItem("ProjectID", projectID);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <a
          href="/createproject"
          class="btn btn-outline-success my-2 my-sm-0 mr-3"
          type="submit"
        >
          Create Project
        </a>
      </div>

      <div class="row mb-5 w-25">
        {project.map((element) => (
          <div>
            <div class="card bg-light mb-3" key={element.ProjectID}>
              <h5 class="card-title mt-3">{element.project_name}</h5>
              <div class="card-body">
                <div class="card-header mb-3">{element.project_desc}</div>
                <a
                  href="/board"
                  class="btn btn-primary mt-auto mt-3"
                  onClick={() => setProjectId(element.project_id)}
                >
                  Click
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
