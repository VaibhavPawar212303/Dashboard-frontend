import { React, useState } from "react";
import HTMLReactParser from "html-react-parser";
import Navbar from "../Navbar/Navbar";
function Singlepost() {
  const [content, setContent] = useState("");

  fetch("https://dappled-blog-api.onrender.com/api/singlepost", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      setContent(response.Artical.Artical);
    });

  return (
    <div>
      <Navbar />
      <main role="main" class="container">
        <div class="row mt-5">
          <div class="col-md-8 blog-main">
            <div class="blog-post">{HTMLReactParser(content)}</div>
          </div>
          <aside class="col-md-4 blog-sidebar">
            <div class="p-3 mb-3 bg-light rounded">
              <h4 class="">About</h4>
              <p class="mb-0">
                Vaibhav Pawar <br />
                QA Enginner Working In Cypress Automation at TestRig
                Technologies
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Singlepost;
