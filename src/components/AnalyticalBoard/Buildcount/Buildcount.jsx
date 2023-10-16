import React from "react";
import {
  BsBugFill,
  BsEye,
  BsXDiamond,
  BsAwardFill,
  BsBox,
} from "react-icons/bs";

function Buildcount() {
  return (
    <div className="ml-3">
      <div className="d-flex gap-4 ml-5">
        <div className="bg-white rounded-sm mt-3 flex-1 border border-gray-400 flex item-center shadow-sm">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400 mt-1 ml-4 mb-1">
            <BsBugFill />
          </div>
          <div className="pl-2 mr-5">
            <span className="ml-2">Total Regression Test</span>
            <div className="flex items-center justify-center">1</div>
          </div>
        </div>
        <div className="bg-white rounded-sm mt-3 flex-1 border border-gray-400 flex item-center shadow-sm">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-400 mt-1 ml-4 mb-1">
            <BsEye />
          </div>
          <div className="pl-2 mr-5">
            <span className="ml-2">Total Visual Test</span>
            <div className="items-center justify-center">1</div>
          </div>
        </div>
        <div className="bg-white rounded-sm mt-3 flex-1 border border-gray-400 flex item-center shadow-sm">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-300 mt-1 ml-4 mb-1">
            <BsXDiamond />
          </div>
          <div className="pl-2 mr-5">
            <span className="ml-2">Total API Test</span>
            <div className="flex items-center justify-center">1</div>
          </div>
        </div>
        <div className="bg-white rounded-sm mt-3 flex-1 border border-gray-400 flex item-center shadow-sm">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-300 mt-1 ml-4 mb-1">
            <BsAwardFill />
          </div>
          <div className="pl-2 mr-5">
            <span className="ml-2">Total Smoke Test</span>
            <div className="flex items-center justify-center">1</div>
          </div>
        </div>
        <div className="bg-white rounded-sm mt-3 flex-1 border border-gray-400 flex item-center shadow-sm ml-2">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-100 mt-1 mb-1">
            <BsBox />
          </div>
          <div className="pl-4 mr-5">
            <span className="ml-2">Total Test</span>
            <div className="items-center justify-center">4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buildcount;
