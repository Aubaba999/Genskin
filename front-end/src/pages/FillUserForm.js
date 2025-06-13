import React from 'react';
import './FormStyles.css';

function FillUserForm() {
  return (
    <div className="form-page">
      <h1>GENSKIN</h1>
      
      <section className="form-section">
        <h2>กรอกข้อมูล</h2>
        <form>
          <div className="form-group">
            <label>ชื่อ</label>
            <input type="text" />
          </div>
          
          <div className="form-group">
            <label>นามสกุล</label>
            <input type="text" />
          </div>
          
          <div className="form-group">
            <label>วัน/เดือน/ปีเกิด</label>
            <input type="date" />
          </div>
          
          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" />
          </div>
          
          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" />
          </div>
          
          <div className="form-group">
            <label>หมู่เลือด</label>
            <select>
              <option value="">เลือกหมู่เลือด</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
          
          <div className="checkbox-group">
            <input type="checkbox" id="data-consent" />
            <label htmlFor="data-consent">ยืนยันว่าข้อมูลที่ให้เป็นข้อมูลจริง</label>
          </div>
          
          <div className="checkbox-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">ยอมรับเงื่อนไข</label>
          </div>
          
          <button type="submit" className="submit-button">บันทึกข้อมูล</button>
        </form>
      </section>
    </div>
  );
}

export default FillUserForm;