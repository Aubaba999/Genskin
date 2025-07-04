import React, { useState } from 'react';
import './PatientDashboard.css';

function PatientDashboard({ setCurrentPage, setCurrentDoctorId, setChatType }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctorIdInput, setDoctorIdInput] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSearchDoctor = () => {
    if (doctorIdInput.trim()) {
      setCurrentDoctorId(doctorIdInput.trim());
      setCurrentPage('found-doctor-profile');
    }
  };

  const handleSidebarClick = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  // ✅ เมนูทั้งหมดของ sidebar
  const sidebarMenu = [
    { key: 'home', label: 'หน้าหลัก' },
    { key: 'camera', label: 'ช่องแชท' },
    { key: 'patient-history', label: 'ประวัติการใช้งาน' },
    { key: 'patient-profile', label: 'ข้อมูลส่วนตัว' },
    { key: 'patient-calendar', label: 'ปฏิทิน' },
    { key: 'feedback', label: 'ข้อเสนอแนะ' },
    { key: 'sign-out', label: 'ลงชื่อออก' }, // ตอนกดจะไปหน้า Sign-out.js
  ];

  return (
    <div className="patient-dashboard">
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
          <div className="user-icon">Ex</div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          {sidebarMenu.map((item) => (
            <li
              key={item.key}
              onClick={() => handleSidebarClick(item.key)}
              className={item.key === 'sign-out' ? 'logout' : ''}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content (แบ่งซ้าย-ขวา) */}
<div className={`dashboard-main ${sidebarOpen ? 'shift' : ''}`}>
  <div className="dashboard-content">
    <h2 className="dashboard-title">เริ่มต้นด้วยการค้นหาแพทย์ของคุณ</h2>
    <div className="search-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="ID แพทย์ของคุณ..."
          className="search-input"
          value={doctorIdInput}
          onChange={(e) => setDoctorIdInput(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchDoctor}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
          </svg>
          ค้นหา
        </button>
      </div>
      <p className="note">สามารถสอบถามจากแพทย์ที่เป็นเจ้าของไข้คุณ</p>
    </div>
  </div>

  {/* รูปภาพด้านขวา */}
  <div className="search-image-container">
    <img src="/images/search.png" alt="search" className="search-image" />
  </div>
</div>
    </div>
  );
}

export default PatientDashboard;
