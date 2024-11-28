import React, { useState } from "react";
import Tabs from "../components/Tabs";
import "./Home.css";
import profileImage from "../assets/images/ea5880_8fdd65c70d8d40fb95ab6dd691690fc6~mv2.avif"; // Import the "Me" image
import awcLogo from "../assets/images/awc Logo.png"; // Import the AWC image

const Home = () => {
  const [activeTab, setActiveTab] = useState("Me");

  const renderContent = () => {
    switch (activeTab) {
      case "Me":
        return (
          <>
            <img src={profileImage} alt="Profile" className="profile-image" />
            <p>
              As a former mechanical engineer, I have found myself increasingly
              drawn to the world of web development and DevOps engineering.
              Creating websites and bringing ideas to life quickly became my
              new focus. The excitement of building something from scratch,
              working to solve problems, and watching it come to life inspired
              me to make the switch and never look back. Now, I help businesses
              enhance and develop their websites, so they can reach their
              digital goals with innovative and dependable solutions.
            </p>
          </>
        );
      case "AWC":
        return (
          <>
            <img src={awcLogo} alt="AWC Logo" className="awc-logo" />
            <p>
              We believe in continuous improvement. Making iterative changes
              until your ideas come to life on your screen. To show others, what
              is yours in the best possible light. AWC is here for you.
            </p>
          </>
        );
      case "Builds":
        return (
          <p>
            We build sites using WordPress, Wix, Shopify & GoDaddy. We also
            write in HTML, CSS, JavaScript, Laravel & React.
          </p>
        );
      case "Coming Soon":
        return (
          <>
            <p>Stay tuned for exciting new updates!</p>
            <ul>
              <li>AWS</li>
              <li>Pulumi</li>
              <li>GitLab</li>
              <li>Python</li>
              <li>Terraform</li>
              <li>TypeScript</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={["Me", "AWC", "Builds", "Coming Soon"]}
        style={{ marginTop: "370px" }}
      />
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Home;
