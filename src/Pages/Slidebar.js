import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { GrDocumentPerformance } from "react-icons/gr";
import { GrIntegration } from "react-icons/gr";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

function Slidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`slider relative h-screen bg-white-200 border-4 border-green-600 rounded-sm ${
        isCollapsed ? "w-[200px]" : "w-[200px] sm:w-[300px]"
      }`}
    >
      <div className="w-full  mt-6 flex flex-col items-center">
        <img
          src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
          alt="Logo"
        />
      </div>

      <div className={`Items flex flex-col ${"items-center"}`}>
        <Link to={"/dashboard"}>
          <div
            className={`w-11/12 flex ${
              isCollapsed ? "flex-col items-center" : "flex-col sm:flex-row"
            } mt-4 hover:bg-green-700 p-3 rounded items-center cursor-pointer`}
          >
            <AiOutlineDashboard
            size={`${isCollapsed ? '20' : '40'}`}
              className={`mb-2 ${isCollapsed ? "" : "sm:mb-0 sm:mr-8"}`}
            />
            <label className={` ${isCollapsed ? "text-xs" : "text-xl"}`}>
              Dashboard
            </label>
          </div>
        </Link>
        <Link to={"/projects"}>
          <div
            className={` w-11/12 flex ${
              isCollapsed ? "flex-col items-center" : "flex-col sm:flex-row"
            } mt-4 hover:bg-green-700 p-3 rounded items-center cursor-pointer`}
          >
            <GrProjects
            size={`${isCollapsed ? '20' : '40'}`}
              className={`mb-2 ${isCollapsed ? "" : "sm:mb-0 sm:mr-8"}`}
            />
            <label className={` ${isCollapsed ? "text-xs" : "text-xl"}`}>
              Projects
            </label>
          </div>
        </Link>
        <Link to={"/performance"}>
          <div
            className={`w-11/12 flex ${
              isCollapsed ? "flex-col items-center" : "flex-col sm:flex-row"
            } mt-4 hover:bg-green-700 p-3 rounded items-center cursor-pointer`}
          >
            <GrDocumentPerformance
            size={`${isCollapsed ? '20' : '40'}`}
              className={`mb-2 ${isCollapsed ? "" : "sm:mb-0 sm:mr-8"}`}
            />
            <label className={` ${isCollapsed ? "text-xs" : "text-xl"}`}>
              Performance
            </label>
          </div>
        </Link>
        <Link to={"/integration"}>
          <div
            className={`w-full flex ${
              isCollapsed ? "flex-col items-center" : "flex-col sm:flex-row"
            } mt-4 hover:bg-green-700 p-11/12 rounded items-center cursor-pointer`}
          >
            <GrIntegration
            size={`${isCollapsed ? '20' : '40'}`}
              className={`mb-2 ${isCollapsed ? "" : "sm:mb-0 sm:mr-8"}`}
            />
            <label className={` ${isCollapsed ? "text-xs" : "text-xl"}`}>
              Integration
            </label>
          </div>
        </Link>
      </div>
      <div
        className="absolute top-1/2 right-[-46px] transform -translate-y-1/2 cursor-pointer bg-half-green rounded-full flex items-center justify-center p-2"
        style={{ width: "80px", height: "80px" }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex mr-7 justify-start items-center w-[80%]">
          {isCollapsed ? (
            <HiChevronRight size={70} />
          ) : (
            <HiChevronLeft size={70} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Slidebar;

{
  /* <div className={`slider h-screen bg-white-200 border-4 border-green-600 ${isCollapsed ? 'w-[200px]' : 'w-[200px] sm:w-[300px]'}`}>
<div className="w-full m-4">
  
    <img
      src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
      alt="Logo"
    />

</div>
<div className={`Items flex flex-col ${isCollapsed ? 'items-center' : 'ml-2 mr-2'}`}>



  <div className={`flex ${isCollapsed ? 'flex-row' : 'flex-col '} sm:flex-row  mt-4 hover:bg-green-700 p-3 rounded ${isCollapsed ? 'items-center' :'items-center'}`}>
    <AiOutlineDashboard className={`mb-2 ${isCollapsed ? '' : 'sm:mb-0 sm:mr-8'}`} />
    <label className="cursor-pointer">Dashboard</label>
  </div>
  <div className={`flex ${isCollapsed ? 'flex-row' : 'flex-col '} sm:flex-row  mt-4 hover:bg-green-700 p-3 rounded ${isCollapsed ? 'items-center' :'items-center'}`}>
    <GrProjects className={`mb-2 ${isCollapsed ? '' : 'sm:mb-0 sm:mr-8'}`} />
    <label className="cursor-pointer">Projects</label>
  </div>
  <div className={`flex ${isCollapsed ? 'flex-row' : 'flex-col '}  sm:flex-row  mt-8 hover:bg-green-700 p-3 rounded ${isCollapsed ? 'items-center' :'items-center'}`}>
    <GrDocumentPerformance className={`mb-2 ${isCollapsed ? '' : 'sm:mb-0 sm:mr-8'}`} />
    <label className="cursor-pointer">Performance</label>
  </div>
  <div className={`flex ${isCollapsed ? 'flex-row' : 'flex-col '}  sm:flex-row  mt-8 hover:bg-green-700 p-3 rounded ${isCollapsed ? 'items-center' :'items-center'}`}>
    <GrIntegration className={`mb-2 ${isCollapsed ? '' : 'sm:mb-0 sm:mr-8'}`} />
    <label className="cursor-pointer ${isCollapsed ? 'text-xs' : 'text-xl'}">Integration</label>
  </div>
</div>
<div className={`w-20 mt-10 ${isCollapsed ? 'ml-[152px]' : 'ml-[252px]'} cursor-pointer bg-half-green rounded-full`} onClick={() => setIsCollapsed(!isCollapsed)}>
  {isCollapsed ? <HiChevronRight size={60} /> : <HiChevronLeft size={60} />}
</div>


</div> */
}

{
  /* <div className="slider h-screen bg-white-200 w-[200px] sm:w-[300px] border-4 border-green-600">
      <div className="w-full m-4">
        <img
          src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
          alt="Logo"
        />
      </div>
      <div className="Items flex flex-col ml-2 mr-2">
        <div className="flex flex-col sm:flex-row mt-8 hover:bg-green-700 p-3 rounded items-center">
          <AiOutlineDashboard className="mb-2 sm:mb-0 sm:mr-8" />
          <label className="cursor-pointer">Dashboard</label>
        </div>
        <div className="flex flex-col sm:flex-row mt-8 hover:bg-green-700 p-3 rounded items-center">
          <GrProjects className="mb-2 sm:mb-0 sm:mr-8" />
          <label className="cursor-pointer">Projects</label>
        </div>
        <div className="flex flex-col sm:flex-row mt-8 hover:bg-green-700 p-3 rounded items-center">
          <GrDocumentPerformance className="mb-2 sm:mb-0 sm:mr-8" />
          <label className="cursor-pointer">Performance</label>
        </div>
        <div className="flex flex-col sm:flex-row mt-8 hover:bg-green-700 p-3 rounded items-center">
          <GrIntegration className="mb-2 sm:mb-0 sm:mr-8" />
          <label className="cursor-pointer">Integration</label>
        </div>
      </div>
      <div className="w-20 mt-10 ml-[252px] cursor-pointer bg-half-green rounded-full ">
        <HiChevronLeft size={60} />
      </div>
    </div> */
}

{
  /* <div className="slider h-screen bg-white-200 w-[300px] border-4	border-green-600">
<div className="w-100 m-4">
  <img
    className=""
    src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
    alt="Logo"
  />
</div>
<div className="Items flex flex-col  ml-2 mr-2">
  <div className="flex  mt-8 hover:bg-green-700 p-3 rounded">
    <AiOutlineDashboard  className="mt-1 mr-8"/>
    <label className="mr-10 cursor-pointer">Dashboard</label>
  </div>
  <div className="flex mt-8 hover:bg-green-700 p-3 rounded">
    <GrProjects className="mt-1 mr-8" />

    <label className="mr-10 cursor-pointer">Projects</label>
  </div>
  <div className="flex mt-8 hover:bg-green-700 p-3 rounded">
    <GrDocumentPerformance  className="mt-1 mr-8"/>
    <label className="mr-10 cursor-pointer">Performance</label>
  </div>
  <div className="flex mt-8 hover:bg-green-700 p-3 rounded">
    <GrIntegration className="mt-1 mr-8"/>

    <label className="mr-10 cursor-pointer">Integration</label>
  </div>
</div>

<div className=" w-20  mt-10 ml-[254px] cursor-pointer bg-half-green  rounded-full">
<HiChevronLeft size={60}  />

</div>
</div> */
}
