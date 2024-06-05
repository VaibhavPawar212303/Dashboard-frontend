import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl, projectID, userID } from "../utilities/config";

function CreateProject() {
  const navigate = useNavigate();
  //pass data to db
  const passDataToDb = (event) => {
    event.preventDefault();
    setprojectname(projectname);
    setprojectdesc(projectdesc);
    setprojecttype(projecttype);

    axios({
      method: "post",
      url: `${baseUrl}/api/project/createproject`,
      data: {
        user_id: `${userID}`,
        Project_ID: `${projectID}`,
        Project_Name: projectname,
        Project_Desc: projectdesc,
        Project_Type: projecttype,
      },
    }).then(function (res) {
      window.stop();
      setMessage(JSON.stringify(res.data.message));
      if (res.data.message === "Project Created Successfully") {
        window.stop();
        return navigate("/", { replace: true });
      }
      window.stop();
    });
  };

  const [projectname, setprojectname] = useState("");
  const [projectdesc, setprojectdesc] = useState("");
  const [projecttype, setprojecttype] = useState("");

  const [message, setMessage] = useState("");

  const setProjectName = (e) => {
    setprojectname(e.target.value);
  };
  const setProjectDesc = (e) => {
    setprojectdesc(e.target.value);
  };
  const setProjectType = (e) => {
    setprojecttype(e.target.value);
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <div class="form-container">
            <h3 class="title">Create Project</h3>
            <label>
              <h6 class="text-secondary">{message}</h6>
            </label>
            <form class="form-horizontal">
              <div class="row">
                <div class="form-group">
                  <label>Add Image</label>

                  <h3>
                    <i class="bi bi-image text-black btn btn-secondary fs-5"></i>
                  </h3>
                </div>
                <div class="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Project Name"
                    value={projectname}
                    onChange={setProjectName}
                  />
                </div>

                <div class="form-group">
                  <label>Project Describtion</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Project Describtion"
                    value={projectdesc}
                    onChange={setProjectDesc}
                  />
                </div>

                <div class="form-group">
                  <label>Project Type</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Project Type"
                    value={projecttype}
                    onChange={setProjectType}
                  />
                </div>
              </div>
              <button class="btn signup" onClick={passDataToDb}>
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
