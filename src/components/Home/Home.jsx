import React from "react";
import Navbar from "../Navbar/Navbar";
import Intro from "../Intro/Intro";
// import Footer from "../Footer/Footer";
import Latestblog from "../Blogs/Latestblog/Latestblog";

function Home() {
  return (
    <div>
      <Navbar />
      <Intro />
      <h1 className="mb-5">Our Latest Blog</h1>
      <Latestblog />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
