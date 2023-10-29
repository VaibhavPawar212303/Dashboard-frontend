import React from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { Menu, Popover } from "@headlessui/react";
function Header() {
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-300 w-[70rem]">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-grey-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search...."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4 pl-11"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:gray-100">
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 right-0 mt-2.5 w-80">
                <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                  <div className="text-gray-700 font-medium">Message</div>
                  <div className="mt-2">This Is Message Pannel..</div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:gray-100">
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 right-0 mt-2.5 w-80">
                <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                  <div className="text-gray-700 font-medium">Notifications</div>
                  <div className="mt-2">This is notifications pannel..</div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
}

export default Header;
