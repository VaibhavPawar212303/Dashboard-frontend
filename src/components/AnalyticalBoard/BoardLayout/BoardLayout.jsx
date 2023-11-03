import React from "react";
import Bars from "../Bars/Bars";
import Piechart from "../Piechart/Piechart";
import Buildcount from "../Buildcount/Buildcount";
import Footer from "../../Footer/Footer";
import Latestbuild from "../Latestbuild/Latestbuild";
import { useNavigate } from "react-router-dom";

function BoardLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Buildcount />
      </div>
      <div>
        <div className="d-flex flex flex-row p-2 mt-5 bg-white rounded-sm border border-gray-400 flex item-center shadow-sm mr-5">
          <Bars />
          <Piechart />
        </div>
      </div>
      <div className="mr-5">
        <div className="mt-5 w-100 bg-white rounded-sm border border-gray-400 w-full mr-5">
          <Latestbuild />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BoardLayout;
