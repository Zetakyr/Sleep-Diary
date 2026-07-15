import { useState } from "react";
import viteLogo from "/vite.svg";
import "./app.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import About from "./pages/About";
import Diary from "./pages/Diary";
import Tutorial from "./pages/Tutorial";

import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route index element={<About />} />
          <Route path="*" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
