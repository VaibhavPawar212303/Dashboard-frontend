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
      <div className="d-flex justify-content-end px-5">
        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            ></path>
          </svg>
          Previous...
        </button>
      </div>
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
