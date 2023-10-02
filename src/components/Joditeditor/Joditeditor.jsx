import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Navbar from "../Navbar/Navbar";

const Joditeditor = () => {
  //pass data to db
  const passDataToDb = () => {
    fetch("http://localhost:5000/api/createBlog", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ArticalData: content }),
    }).then(function (res) {
      console.log(res);
    });
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <>
      <Navbar />
      <div>
        <h1 class="display-5 mt-5">Add Your Blog</h1>
        <div class="input-group input-group-lg mt-5 ml-5 w-75">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-lg">
              Add your title
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group mt-5 ml-5 w-75">
          <div class="input-group-prepend">
            <span class="input-group-text">Add Blog Introduction</span>
          </div>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
      </div>
      <div className="ml-5 mr-5 mt-5 w-75">
        <JoditEditor
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
        />
        <div className="mt-5 mb-5">
          <button type="button" class="btn btn-primary" onClick={passDataToDb}>
            Submit Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Joditeditor;
