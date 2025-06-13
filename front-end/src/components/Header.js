import React from 'react';
import './Header.css';

function Header({ setCurrentPage }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => setCurrentPage('home')}>
        <img src="/images/logo.png" alt="GENSKIN Logo" />
      </div>
      <nav className="nav">
        <button className="nav-link prompt-regular" onClick={() => setCurrentPage('home')}>หน้าหลัก</button>
        <button className="nav-link prompt-regular" onClick={() => setCurrentPage('about')}>เกี่ยวกับเรา</button>
        <button className="nav-link prompt-regular" onClick={() => setCurrentPage('services')}>บริการ</button>
        <button className="nav-link prompt-regular" onClick={() => setCurrentPage('contact')}>ติดต่อ</button>
        <button 
          className="start-btn"
          onClick={() => setCurrentPage('login')}
        >
          เริ่มต้นใช้งาน
        </button>
      </nav>
    </header>
  );
}

export default Header;
