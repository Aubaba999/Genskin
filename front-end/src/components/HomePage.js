import React from 'react';
import './HomePage.css';

function HomePage({ setCurrentPage }) {
  return (
    <div className="homepage">
      <h1>วิเคราะห์หน้า ใส่ใจผิว</h1>
      <p>ติดตามการรักษาโรคผิวหนังบนใบหน้าด้วยโมเดล 3D และภาพถ่ายอย่างแม่นยำ</p>
      
      <button 
        className="start-btn"
        onClick={() => setCurrentPage('login')}
      >
        เริ่มต้นใช้งาน
      </button>
    </div>
  );
}

export default HomePage;