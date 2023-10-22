import React from "react";
import Linegraph from "../Linegraph/Linegraph";
import Bars from "../Bars/Bars";
import Piechart from "../Piechart/Piechart";
import Buildcount from "../Buildcount/Buildcount";
import Footer from "../../Footer/Footer";
import Latestbuild from "../Latestbuild/Latestbuild";

function BoardLayout() {
  return (
    <div className="bg-white">
      <div className="ml-5">
        <Buildcount />
      </div>
      <div class="d-flex flex-row mt-2 ml-5">
        <div class="p-2 ml-5 w-75 h-75 mt-5 bg-white rounded-sm border border-gray-400 flex item-center shadow-sm">
          <Bars />
        </div>
        <div className="ml-5 w-100 h-100 mr-5 mb-5 mt-3">
          <div class="p-2 ml-5 mt-5 bg-white rounded-sm border border-gray-400 flex item-center shadow-sm">
            <Piechart />
          </div>
        </div>
      </div>
      <div className="ml-5">
        <div className="ml-5 mt-2 w-75 bg-white rounded-sm border border-gray-400">
          <div className="w-100">
            <Latestbuild />
          </div>
        </div>
      </div>
      <div className="ml-5">
        <div className="ml-5 mt-5 w-75 bg-white rounded-sm border border-gray-400 flex item-center shadow-sm">
          <div className="w-75 ml-5 mt-5">
            <Linegraph />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BoardLayout;
