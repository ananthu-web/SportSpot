import React from "react";
import { FaTrophy } from "react-icons/fa";
import "../Styles/ServerWaking.css";

const ServerWaking = () => {
  return (
    <div className="server-waking-overlay">
      <div className="waking-card">
        <div className="icon-container">
          <div className="loading-ring"></div>
          <FaTrophy className="sports-icon" />
        </div>
        
        <h2>Waking up SportSpot</h2>
        <p>
          Our servers are warming up to bring you the best sports fields in town. 
          This usually takes about 30 seconds.
        </p>

        <div className="status-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default ServerWaking;
