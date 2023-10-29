import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
// import Editor from "./components/Editor/Editor";
import Singlepost from "./components/Blogs/Singlepost/Singlepost";
import Joditeditor from "./components/Joditeditor/Joditeditor";
import Register from "./components/Authentication/Register/Register";
import Login from "./components/Authentication/Login/Login";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/Protected/PrivateRoute";
import Latestblog from "./components/Blogs/Latestblog/Latestblog";
import Projects from "./components/Projects/Projects";
import CreateProject from "./components/Projects/CreateProject";
//import Build from "./components/Build/Build";
import BoardLayout from "./components/AnalyticalBoard/BoardLayout/BoardLayout";
import Buildreport from "./components/Build/Buildreport";
import HelpAndSupport from "./components/HelpAndSupport/HelpAndSupport";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singlepost" element={<Singlepost />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/editor" element={<Joditeditor />} />
          <Route path="/latestblog" element={<Latestblog />} />
          <Route path="/" element={<BoardLayout />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/buildreport" element={<Buildreport />} />
          <Route path="/helpandsupport" element={<HelpAndSupport />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
