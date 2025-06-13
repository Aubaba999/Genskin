import React, { useState } from 'react';
import './PatientDashboard.css';

function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="patient-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <button 
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <img src="/images/logo.png" alt="GENSKIN Logo" className="logo-img" />
        <div className="header-right">
          <span className="manual-link">คู่มือการใช้งาน</span>
          <img src="/images/bell-icon.png" alt="Notifications" className="icon" />
          <div className="user-icon">Ex</div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li>หน้าหลัก</li>
          <li>ช่องแชท</li>
          <li>ประวัติการใช้งาน</li>
          <li>ข้อมูลส่วนตัว</li>
          <li>ปฏิทิน</li>
          <li>ข้อเสนอแนะ</li>
          <li className="logout">ลงชื่อออก</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`dashboard-content ${sidebarOpen ? 'shift' : ''}`}>
        <h2>เริ่มต้นด้วยการค้นหาแพทย์ของคุณ</h2>
        <div className="search-section">
          <input 
            type="text" 
            placeholder="ID แพทย์ของคุณ..." 
            className="search-input" 
          />
          <button className="search-btn">
            <img src="/images/search-icon.png" alt="Search" />
            ค้นหา
          </button>
        </div>
        <p className="note">สามารถสอบถามจากแพทย์ที่เป็นเจ้าของไข้คุณ</p>
      </div>
    </div>
  );
}

export default PatientDashboard;
