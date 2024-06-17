import LoginPage from "./Pages/LoginPage";

import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard"

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Projects from "./Pages/Projects";
import Testcases from "./Pages/Testcases";
import Performance from "./Pages/Performance";
import Integration from "./Pages/Integration";
import Slidebar from "./Pages/Slidebar";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/sign-up",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>
  },
  {
    path: "/projects",
    element: <Projects></Projects>
  },
  {
    path: "/testcase",
    element: <Testcases></Testcases>
  },
  {
    path: "/performance",
    element: <Performance></Performance>
  },
  {
    path: "/integration",
    element: <Integration></Integration>
  }
]);

function App() {
  return (

    <RouterProvider router={router} />
    
  );
}

export default App;
