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

      <div class="row mb-5 ml-5 w-75">
        {project.map((element) => (
          <div class="col-sm-3 mb-3">
            <div class="card mb-5 h-100 w-100" key={element.ProjectID}>
              <div class="card-body d-flex flex-column mt-auto">
                <h5 class="card-title">{element.projectName}</h5>
                <p class="card-text text-left mt-auto">{element.projectDesc}</p>
                <a
                  href="/board"
                  class="btn btn-primary mt-auto"
                  onClick={() => setProjectId(element.ProjectID)}
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
