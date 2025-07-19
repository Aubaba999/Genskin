import React, { useState } from 'react';
import './CreateNVeri.css';

function CreateAccount({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // ตรวจสอบ email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'กรุณากรอก Email';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'รูปแบบ Email ไม่ถูกต้อง';
    }
    
    // ตรวจสอบ password
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }
    
    // ตรวจสอบ confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // ถ้าข้อมูลถูกต้อง ไปหน้า login
    setErrors({});
    alert('สร้างบัญชีสำเร็จ! กำลังนำไปยังหน้าเข้าสู่ระบบ');
    setCurrentPage('login'); // เปลี่ยนไปหน้า login ที่คุณทำไว้แล้ว
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <h1>สร้างบัญชีผู้ใช้</h1>
        <p className="subtitle">กรอกข้อมูลเพื่อสร้างบัญชีของคุณ</p>
        
        <div className="create-account-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="form-input"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              className="form-input"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              className="form-input"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <button onClick={handleSubmit} className="create-button">
            สร้างบัญชี
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;