import React from 'react';
import './FormStyles.css';

function FillDoctorForm() {
  return (
    <div className="form-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>กรอกข้อมูลแพทย์</h2>
      <form>
        <div className="form-group">
          <label>ชื่อผู้ใช้</label>
          <input type="text" required />
        </div>
        
        <div className="form-group">
          <label>อีเมล</label>
          <input type="email" placeholder="example@gmail.com" required />
        </div>
        
        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input 
            type="password" 
            placeholder="อย่างน้อย 8 ตัวอักษร" 
            minLength="8"
            required
          />
        </div>
        
        <div className="form-group">
          <label>ยืนยันรหัสผ่าน</label>
          <input type="password" required />
        </div>
        
        <div className="form-section">
          <h3>ข้อมูลส่วนตัว</h3>
          <div className="form-row">
            <div className="form-group">
              <label>ชื่อ</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>นามสกุล</label>
              <input type="text" required />
            </div>
          </div>

          <div className="form-group">
              <label>รหัสบัตรประชาชน</label>
              <input type="text" required />
            </div>
        </div>
        
        <div className="form-section">
          <h3>ข้อมูลวิชาชีพ</h3>
          <div className="form-group">
            <label>เลขที่ใบอนุญาตประกอบวิชาชีพ</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>ชื่อโรงพยาบาล/สถานที่ทำงาน</label>
            <input type="text" required />
          </div>
        </div>
        
        <div className="form-section">
          <h3>ข้อมูลติดต่อ</h3>
          <div className="form-group">
            <label>อีเมลจากโรงพยาบาล</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" required />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
  );
}

export default FillDoctorForm;