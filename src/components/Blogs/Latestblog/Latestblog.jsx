import { React, useState, useEffect } from "react";

export default function Latestblog() {
  const [content, setContent] = useState([]);

  const getArtical = () => {
    fetch("http://localhost:5000/api/getAllBlogs", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setContent(data.json));
  };

  useEffect(() => {
    getArtical();
  }, []);

  const setBlogId = (blogid) => {
    localStorage.setItem("BlogId", blogid);
  };

  return (
    <>
      <h1 className="mb-5">Our Latest Blog</h1>
      <div class="row mb-5 ml-1">
        {content.map((element) => (
          <div class="col-sm-3 mb-3">
            <div class="card mb-5" key={element.BlogID}>
              <div class="card-body">
                <h5 class="card-title">{element.title}</h5>
                <p class="card-text text-left">
                  {element.introduction.substr(0, 150)}...
                </p>
                <button
                  class="btn btn-primary"
                  onClick={() => setBlogId(element.BlogID)}
                >
                  <a href="/singlepost" class="btn btn-primary">
                    Read Blog
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
