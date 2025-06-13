import React from 'react';
import './RoleSelection.css';

function RoleSelection({ setCurrentPage }) {
  return (
    <div className="role-selection-page">
      <h2>เริ่มต้นใช้งานในฐานะ...</h2>
      
      <div className="role-options">
        <div 
          className="role-card patient"
          onClick={() => setCurrentPage('patient-dashboard')} // เปลี่ยนเป็น patient-dashboard
        >
          <h3>ผู้รับบริการ</h3>
          <p>สำหรับผู้ที่ต้องการวิเคราะห์และติดตามสภาพผิว</p>
        </div>
        
        <div 
          className="role-card doctor"
          onClick={() => setCurrentPage('fill-doctor')}
        >
          <h3>บุคลากรทางการแพทย์</h3>
          <p>สำหรับผู้ให้บริการทางการแพทย์</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;