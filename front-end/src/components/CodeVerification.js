import React, { useState } from 'react';
import './CreateNVeri.css';

function CodeVerification({ setCurrentPage }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // ตรวจสอบรูปแบบรหัส (ตัวอย่าง: #A5S2J)
    const codePattern = /^#[A-Z0-9]{5}$/;
    
    if (!codePattern.test(code)) {
      setError('รหัสไม่ถูกต้อง กรุณากรอกรหัส # 1 ตัว และตัวอักษร 5 ตัว เช่น #A5S2J');
      return;
    }

    // ถ้ารหัสถูกต้อง ไปหน้าสร้างบัญชี
    setError('');
    setCurrentPage('create-account');
  };

  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase();
    
    // ถ้าไม่ได้ขึ้นต้นด้วย # ให้เพิ่ม # ข้างหน้า
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
    
    // จำกัดความยาวไม่เกิน 6 ตัวอักษร (# + 5 ตัวอักษร)
    if (value.length > 6) {
      value = value.substring(0, 6);
    }
    
    setCode(value);
    setError(''); // ล้าง error เมื่อมีการพิมพ์
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h1>ยืนยันรหัสของคุณ</h1>
        <p className="subtitle">กรุณากรอกรหัส # 1 ตัว และตัวอักษร 5 ตัว</p>
        
        <div className="verification-form">
          <div className="form-group">
            <label htmlFor="code">รหัสยืนยัน</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="เช่น #A5S2J"
              className="code-input"
              maxLength={6}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button onClick={handleSubmit} className="verify-button">
            ตรวจสอบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeVerification;