// components/GlassesIndicator.js
import React from "react";

const GlassesIndicator = ({ hasGlasses }) => {
  if (!hasGlasses) return null;

  return (
    <div className="glasses-indicator">
      <div className="glasses-status">
        <span className="glasses-icon">👓</span>
        <span>ตรวจพบแว่นตา</span>
      </div>
    </div>
  );
};

export default GlassesIndicator;