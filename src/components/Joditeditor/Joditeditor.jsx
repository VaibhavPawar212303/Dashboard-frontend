import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

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
    <div className="ml-5 mr-5 mt-5">
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          console.log(newContent);
        }}
      />
      <div>
        <button onClick={passDataToDb}>Submit Blog</button>
      </div>
    </div>
  );
};

export default Joditeditor;
