import React from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab, tabs, style }) => {
  return (
    <div className="tabs-container" style={style}>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
