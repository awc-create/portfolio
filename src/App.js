import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [activeTab, setActiveTab] = useState("Me");

  return (
    <div className="App">
      <div className="layout">
        {/* Navigation */}
        <div className="left-section">
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Middle Section: Page Title */}
        <div className="middle-section">
          <h1 className="page-title">Page Title</h1>
        </div>

        {/* Right Section: Page Content */}
        <div className="right-section">
          <Routes>
            <Route path="/" element={<Home activeTab={activeTab} setActiveTab={setActiveTab} />} />
            <Route path="/projects" element={<h1>Projects Page</h1>} />
            <Route path="/book-online" element={<h1>Book Online Page</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
