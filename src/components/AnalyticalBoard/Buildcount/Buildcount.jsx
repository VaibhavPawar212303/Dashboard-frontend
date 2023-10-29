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
    <div className="flex gap-14 w-full mt-2">
      <div className="bg-white rounded-sm flex-1 border border-gray-400 flex item-center w-62">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400 mt-1 ml-2">
          <BsBugFill className="text-2xl text-white" />
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm text-gray font-light">
            Regression Test
          </span>
          <div className="flex items-center text-gray">1</div>
        </div>
      </div>
      <div className="bg-white rounded-sm flex-1 border border-gray-400 flex item-center">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-400 mt-1 ml-2">
          <BsEye />
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm text-gray font-light">
             Visual Test
          </span>
          <div className="flex items-center text-gray">1</div>
        </div>
      </div>
      <div className="bg-white rounded-sm flex-1 border border-gray-400 flex item-center w-48">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-300 mt-1 ml-2">
          <BsXDiamond />
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm text-gray font-light">API Test</span>
          <div className="flex items-center text-gray">1</div>
        </div>
      </div>
      <div className="bg-white rounded-sm flex-1 border border-gray-400 flex item-center w-48">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-300 mt-1 ml-2">
          <BsAwardFill />
        </div>
        <div className="pl-2 mt-2">
          <span className="text-sm text-gray font-light">Smoke Test</span>
          <div className="flex items-center text-gray">1</div>
        </div>
      </div>
      <div className="bg-white rounded-sm flex-1 border border-gray-400 flex item-center w-48">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-100 mt-1 mb-1 ml-2">
          <BsBox />
        </div>
        <div className="pl-4 mt-2">
          <span className="text-sm text-gray font-light">Total Test</span>
          <div className="flex items-center text-gray">4</div>
        </div>
      </div>
    </div>
  );
}

export default Buildcount;
