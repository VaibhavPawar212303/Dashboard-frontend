import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Editor from "./components/Editor/Editor";
import Singlepost from "./components/Singlepost/Singlepost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/singlepost" element={<Singlepost />} />
      </Routes>
    </div>
  );
}

export default App;
