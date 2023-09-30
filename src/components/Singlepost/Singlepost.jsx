import React from "react";

function Singlepost() {
  const [header, setHeader] = React.useState("");
  const [paragraph, setParagraph] = React.useState("");

  function paragraphcomponent({ props }) {
    return <p>{props}</p>;
  }

  fetch("http://localhost:5000/api/singlepost", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const data = response.articals.blocks;
      for (let index = 0; index < data.length; index++) {
        const element = data[index].type;
        if (element === "header") {
          setHeader(data[index].data.text);
        } else if (element === "paragraph") {
          paragraphcomponent(data[index].data.text);
        }
      }
    });

  return (
    <div>
      <h1>{header}</h1>
      <p>{paragraph}</p>
    </div>
  );
}

export default Singlepost;
