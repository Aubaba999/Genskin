import React, { useState } from 'react';
import './DoctorDashboard.css';

function DoctorDashboard({ setCurrentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSidebarClick = (page) => {
    if (page === 'chat') {
      // ไม่ทำอะไรเลยเมื่อกดช่องแชท
      return;
    }
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <button className="menu-btn" onClick={toggleSidebar}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <img src="/images/logo.png" alt="GENSKIN Logo" />
        </div>
        <div className="header-right">
          <span className="manual-link">คู่มือการใช้งาน</span>
          <img src="/images/bell-icon.png" alt="Notifications" className="icon" />
          <div className="user-icon">Dr</div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li onClick={() => handleSidebarClick('home')}>หน้าหลัก</li>
          <li onClick={() => handleSidebarClick('chat')}>ช่องแชท</li>
          <li onClick={() => handleSidebarClick('patient-record')}>ประวัติการใช้งานของคนไข้</li>
          <li onClick={() => handleSidebarClick('doctor-appointment')}>นัดติดตามอาการ</li>
          <li onClick={() => handleSidebarClick('doctor-profile')}>ข้อมูลส่วนตัว</li>
          <li onClick={() => handleSidebarClick('feedback')}>ข้อเสนอแนะ</li>
          <li className="logout" onClick={() => setCurrentPage('login')}>ลงชื่อออก</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`dashboard-content ${sidebarOpen ? 'shift' : ''}`}>
        <div className="doctor-main-content">
          <div className="welcome-section">
            <div className="welcome-text-container">
              <div className="illustration-placeholder">
                <img src="/images/girl.png" alt="Doctor Illustration" className="illustration-img" />
              </div>
              <h2 className="main-title">เริ่มต้นการติดตามการรักษา <br />มีประสิทธิภาพยิ่งขึ้น</h2>
              <button className="start-btn">เริ่มต้น</button>
            </div>
          </div>

          <div className="recent-activity">
            <div className="activity-card">
              <span className="activity-icon">✉️</span>
              <div className="activity-details">
                <p className="activity-name">ปิ่นมณี เศรษฐโชติ</p>
                <p className="activity-description">ได้ส่งผลสรุปการวิเคราะห์ให้คุณ</p>
                <p className="activity-action" onClick={() => console.log('คลิกเพื่อเปิดผลสรุป')}>
                  คลิกที่นี่เพื่อดูผลสรุปการวิเคราะห์
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
