import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateProject() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  //pass data to db
  const passDataToDb = (event) => {
    event.preventDefault();
    setprojectname(projectname);
    setprojectdesc(projectdesc);

    axios({
      method: "post",
      url: "https://dappled-blog-api.onrender.com/api/project/createproject",
      data: {
        userID: `${userID}`,
        projectName: projectname,
        projectDesc: projectdesc,
      },
    }).then(function (res) {
      window.stop();
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
  const [message, setMessage] = useState("");

  const setProjectName = (e) => {
    setprojectname(e.target.value);
  };
  const setProjectDesc = (e) => {
    setprojectdesc(e.target.value);
  };

  return (
    <div className="ml-5 w-50">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create Project</h5>
            <form class="form-horizontal">
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
              <a class="btn btn-primary" onClick={passDataToDb}>
                Create Project
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
