import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products"; // Ensure this component is imported
import BookOnline from "./pages/BookOnline"; // Ensure this component is imported
import { Preloader } from "./components/Preloader";

function App() {
  const [activeTab, setActiveTab] = useState("Me");
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current route

  // Hide the preloader after 3 seconds (adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // Determine the page title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "About";
      case "/projects":
        return "Products";
      case "/book-online":
        return "Book Online";
      default:
        return "Page Title"; // Fallback title
    }
  };

  return (
    <div className="App">
      {loading ? (
        <Preloader />
      ) : (
        <div className="layout">
          {/* Navigation */}
          <div className="left-section">
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Middle Section: Page Title */}
          <div className="middle-section">
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>

          {/* Right Section: Page Content */}
          <div className="right-section">
            <Routes>
              <Route
                path="/"
                element={<Home activeTab={activeTab} setActiveTab={setActiveTab} />}
              />
              <Route
                path="/projects"
                element={<Products activeTab={activeTab} setActiveTab={setActiveTab} />}
              />
              <Route
                path="/book-online"
                element={<BookOnline activeTab={activeTab} setActiveTab={setActiveTab} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
