import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar() {
  
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-white-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <img
                  src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
                  alt="Logo"
                  className="h-8 w-auto mt-2 mr-10 mb-2"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4 mt-1 mb-2">
                  <Link to="/dashboard">
                    <label className="mr-10 cursor-pointer">Dashboard</label>
                  </Link>
                  <Link to="/projects">
                    <label className="mr-10 cursor-pointer">Projects</label>
                  </Link>
                  <Link to="/testcase">
                    <label className="mr-10 cursor-pointer">Testcases</label>
                  </Link>
                  <Link to="/performance">
                    <label className="mr-10 cursor-pointer">Performance</label>
                  </Link>
                  <Link to="/integration">
                    <label className="mr-10 cursor-pointer">Integration</label>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex mt-1 flex-row ml-auto mb-2 mr-5 relative">
              <input
                className="p-1 pl-5 border-2 border-black rounded-lg"
                type="text"
                placeholder="search your project..."
              />
              <CiSearch className="absolute mt-3 ml-1" />
            </div>
          </div>
        </div>
  
        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/dashboard">
              <label className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Dashboard</label>
            </Link>
            <Link to="/projects">
              <label className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Projects</label>
            </Link>
            <Link to="/testcase">
              <label className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Testcases</label>
            </Link>
            <Link to="/performance">
              <label className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Performance</label>
            </Link>
            <Link to="/integration">
              <label className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Integration</label>
            </Link>
          </div>
        </div>
      </nav>
    );
  };
  
  

export default Navbar;



{/* <div className="flex flex-row bg-green-200 ">
<div className="mt-2 mr-10 mb-2">
  <img
    src="https://www.testrigtechnologies.com/wp-content/uploads/2023/03/Testrig-logo-color.svg"
    alt="Logo"
  />
</div>
<div className="mt-1 mb-2">
  <Link to={'/dashboard'} >
  <label className="mr-10 cursor-pointer">Dashboard</label>
  </Link>
  <Link to={'/projects'}>
  <label className="mr-10 cursor-pointer">Projects</label>
  </Link>
  <Link to={'/testcase'}>
  <label className="mr-10 cursor-pointer">Testcases</label>
  </Link>
  <Link to={'/performance'}>
  <label className="mr-10 cursor-pointer">Performance</label>
  </Link>
  <Link to={'/integration'}>
  <label className="mr-10 cursor-pointer">Integration</label>
  </Link>
</div>
<div className="flex mt-1 flex-row ml-auto mb-2 mr-5 relative">
  <input
    className="p-1 pl-5 border-2 border-black rounded-lg "
    type="text"
    placeholder="search your project..."
  />
  <CiSearch className="absolute mt-3 ml-1 " />
</div>
</div> */}