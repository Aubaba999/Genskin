import React from "react";
import { FiImage, FiZoomIn, FiFileText } from "react-icons/fi";

const AnalysisResults = () => (
  <div className="pd-card">
    <h3 className="pd-card-header">Analysis Tools</h3>
    <div className="pd-analysis-results-grid">
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Image Analysis</span>
      </div>
      <div className="pd-result-item">
        <FiZoomIn className="pd-result-icon" />
        <span>Enhanced View</span>
      </div>
      <div className="pd-result-item">
        <FiFileText className="pd-result-icon" />
        <span>Generate Report</span>
      </div>
    </div>
  </div>
);

export default AnalysisResults;