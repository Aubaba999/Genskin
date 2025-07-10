// components/SessionCompleteOverlay.js
import React from "react";

const SessionCompleteOverlay = ({
  capturedImages,
  resetSession,
  goHome,
  poseInstructions,
}) => {
  return (
    <div className="session-complete-overlay">
      <div className="session-complete-content">
        <div className="session-complete-icon">🎉</div>
        <div className="session-complete-title">ถ่ายภาพเสร็จสิ้น!</div>
        <div className="session-complete-subtitle">
          ได้รับภาพทั้งหมด {capturedImages.length} ท่า
        </div>

        <div className="captured-images-preview">
          {capturedImages.map((img, index) => (
            <div
              key={`captured-${img.id}-${img.timestamp}`}
              className="preview-image-container"
            >
              <img
                src={img.image}
                alt={`Pose ${index + 1}`}
                className="preview-image"
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.target.style.display = "none";
                }}
              />
              <div className="preview-label">
                {index + 1}. {img.pose}
              </div>
            </div>
          ))}
        </div>

        <div className="session-actions">
          <button
            onClick={resetSession}
            className="session-button session-button-retry"
          >
            ถ่ายใหม่
          </button>
          <button
            onClick={goHome}
            className="session-button session-button-finish"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCompleteOverlay;