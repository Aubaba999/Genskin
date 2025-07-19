import React from "react";
import { FiImage } from "react-icons/fi";

const MyAnalysisResults = () => (
  <div className="pd-card">
    <h3 className="pd-card-header">My Analysis Results</h3>
    <div className="pd-analysis-results-grid">
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Your Image</span>
      </div>
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Your Image</span>
      </div>
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Your Image</span>
      </div>
    </div>
  </div>
);

export default MyAnalysisResults;