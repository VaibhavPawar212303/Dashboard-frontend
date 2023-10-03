import { React, useState, useEffect } from "react";

import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";
import HTMLReactParser from "html-react-parser";

function Singlepost() {
  const [content, setContent] = useState("");
  const [blog, setBlogdata] = useState("");
  const blogid = localStorage.getItem("BlogId");
  async function getUserData() {
    try {
      await axios
        .get(`https://dappled-blog-api.onrender.com/api/singlepost/${blogid}`)
        .then((response) => {
          setContent(response.data.blogdata);
          setBlogdata(response.data.blogdata.blogData);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, [setContent]);
  return (
    <div>
      <Navbar />
      <main role="main" class="container">
        <div class="row mt-5">
          <div class="col-md-8 blog-main">
            <h1>{content.title}</h1>
            <p>{content.introduction}</p>
            <div class="blog-post">{HTMLReactParser(blog)}</div>
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
      <Footer />
    </div>
  );
}

export default Singlepost;
