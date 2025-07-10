// components/ScanFrame.js
import React from "react";

const ScanFrame = ({ faceInFrame, hasGlasses, direction, isCountingStable }) => {
  return (
    <div className="scan-frame-container">
      <div className="scan-frame-wrapper">
        <div className="scan-frame">
          <div className="scan-corners">
            <div
              className={`corner corner-tl ${
                faceInFrame && !hasGlasses
                  ? "corner-success"
                  : hasGlasses
                  ? "corner-warning"
                  : "corner-default"
              }`}
            />
            <div
              className={`corner corner-tr ${
                faceInFrame && !hasGlasses
                  ? "corner-success"
                  : hasGlasses
                  ? "corner-warning"
                  : "corner-default"
              }`}
            />
            <div
              className={`corner corner-bl ${
                faceInFrame && !hasGlasses
                  ? "corner-success"
                  : hasGlasses
                  ? "corner-warning"
                  : "corner-default"
              }`}
            />
            <div
              className={`corner corner-br ${
                faceInFrame && !hasGlasses
                  ? "corner-success"
                  : hasGlasses
                  ? "corner-warning"
                  : "corner-default"
              }`}
            />
          </div>

          <div
            className={`frame-border ${
              faceInFrame && !hasGlasses
                ? "frame-border-success"
                : hasGlasses
                ? "frame-border-warning"
                : "frame-border-default"
            }`}
          ></div>
        </div>

        <div className="direction-text">
          <div
            className={`direction-message ${
              faceInFrame && !hasGlasses
                ? "direction-success"
                : hasGlasses
                ? "direction-warning"
                : "direction-default"
            }`}
          >
            {isCountingStable && !hasGlasses
              ? "กำลังเตรียมถ่ายภาพ..."
              : direction || "กำลังตรวจจับใบหน้า..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanFrame;