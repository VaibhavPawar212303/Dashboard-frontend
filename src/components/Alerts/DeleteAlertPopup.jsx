import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DeleteAlertPopup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleButtonClick = (event) => {
    setShow(true);
  };

  if (location.pathname === "/board") {
    return (
      <div class="ml-3 d-flex">
        <div>
          <a onClick={setShow} href="#" class="btn btn-outline-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="black"
              class="bi bi-trash"
              viewBox="0 0 18 18"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </a>
        </div>
        <div>
          {show && (
            <div class="mt-3 ml-5 d-flex">
              <Alert
                style={{ fontSize: "20px", width: "800px" }}
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Delete Project</Alert.Heading>
                <p class="mb-5">
                  Are you sure you want to delete this project?
                </p>
                <div class="">
                  <button class="btn btn-outline-danger mr-3">Yes</button>
                  <button class="btn btn-outline-success">No</button>
                </div>
              </Alert>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div class="ml-3">
        <div>
          <a onClick={setShow} href="#" class="btn btn-outline-danger">
            Delete
          </a>
        </div>
        <div>
          {show && (
            <div class="">
              <Alert
                style={{ fontSize: "20px", width: "800px" }}
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Delete Project</Alert.Heading>
                <p class="mb-5">
                  Are you sure you want to delete this project?
                </p>
                <div class="">
                  <button class="btn btn-outline-danger mr-3">Yes</button>
                  <button class="btn btn-outline-success">No</button>
                </div>
              </Alert>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DeleteAlertPopup;
