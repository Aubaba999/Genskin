// components/ProgressIndicator.js
import React from "react";

const ProgressIndicator = ({ currentPose, poseInstructions }) => {
  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <div className="progress-title">ถ่ายภาพ {currentPose + 1}/3</div>
        <div className="progress-subtitle">{poseInstructions[currentPose]}</div>
      </div>
      <div className="progress-dots">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`progress-dot ${index <= currentPose ? "active" : ""} ${
              index < currentPose ? "completed" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;