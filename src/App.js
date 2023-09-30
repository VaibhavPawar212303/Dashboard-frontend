import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
// import Editor from "./components/Editor/Editor";
import Singlepost from "./components/Singlepost/Singlepost";
import Joditeditor from "./components/Joditeditor/Joditeditor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Joditeditor />} />
        <Route path="/singlepost" element={<Singlepost />} />
      </Routes>
    </div>
  );
}

export default App;
