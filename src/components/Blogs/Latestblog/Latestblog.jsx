import { React, useState, useEffect } from "react";

export default function Latestblog() {
  const [content, setContent] = useState([]);
  const getArtical = () => {
    fetch("https://dappled-blog-api.onrender.com/api/getAllBlogs", {
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
      <div class="row mb-5 ml-5 w-100">
        {content.map((element) => (
          <div class="col-sm-3 mb-3">
            <div class="card mb-5 h-100 w-100" key={element.BlogID}>
              <div class="card-body d-flex flex-column mt-auto">
                <h5 class="card-title">{element.title}</h5>
                <p class="card-text text-left mt-auto">
                  {element.introduction.substr(0, 150)}...
                </p>
                <a
                  href="/singlepost"
                  class="btn btn-primary mt-auto"
                  onClick={() => setBlogId(element.BlogID)}
                >
                  Read Blog
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
