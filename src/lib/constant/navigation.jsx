import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { BiEdit } from "react-icons/bi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "project",
    label: "Project",
    path: "/project",
    icon: <HiOutlineCube />,
  },
  {
    key: "blog",
    label: "Blog",
    path: "/latestblog",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "editor",
    label: "Editor",
    path: "/editor",
    icon: <BiEdit />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "support",
    label: "Help & Support",
    path: "/helpandsupport",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
