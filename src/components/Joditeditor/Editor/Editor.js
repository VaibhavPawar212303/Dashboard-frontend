/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "",
          level: 1,
        },
      },
    ],
  };
};

const Editor = () => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        await editor.saver.save().then((outputdate) => {
          console.log("Artical Data:", outputdate);
          setEditorData(outputdate);
        });
        // Put your logic here to save this data to your DB
      },
      autofocus: true,
      tools: {
        header: Header,
      },
    });
  };

  //pass data to db
  const passDataToDb = () => {
    fetch("http://localhost:5000/api/createBlog", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ArticalData: editorData }),
    }).then(function (res) {
      console.log(res);
    });
  };

  return (
    <React.Fragment>
      <div className="mt-5">
        <h1>Add Your Blog </h1>
      </div>
      <div id="editorjs" className="bg-white mt-5 ml-5 mr-3 w-75"></div>
      <button onClick={passDataToDb}>Submit Data</button>
    </React.Fragment>
  );
};

export default Editor;
