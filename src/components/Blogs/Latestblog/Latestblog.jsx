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

  return (
    <>
      {content.map((element) => (
        <div class="row mb-5 ml-3">
          <div class="col-sm-4 mb-3 mb-sm-0 w-25 h-25">
            <div class="card" key={element.BlogID}>
              <div class="card-body">
                <h5 class="card-title">{element.title}</h5>
                <p class="card-text">{element.introduction}</p>
                <a href="/singlepost" class="btn btn-primary">
                  Read Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
