import React from "react";
import Bars from "../Bars/Bars";
import Piechart from "../Piechart/Piechart";
import Buildcount from "../Buildcount/Buildcount";
import Latestbuild from "../Latestbuild/Latestbuild";
import Latestupdates from "../../Latestupdates/Latestupdates";

function BoardLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div className="ml-2 mr-3">
        <Buildcount />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Bars />
        <Piechart />
      </div>
      <div className="flex flex-row gap-4 w-full mb-5">
        <Latestbuild />
        <Latestupdates />
      </div>
    </div>
  );
}

export default BoardLayout;
