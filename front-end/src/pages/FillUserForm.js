import React from 'react';
import './FormStyles.css';

function FillUserForm( {setCurrentPage} ) {
  return (
    <div className="form-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      
      <section className="form-section">
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
          <div className='form-actions'>
          <button 
            type="button" 
            className="submit-btn" 
            onClick={() => setCurrentPage('patient-dashboard')}
          >
          บันทึกข้อมูล
          </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default FillUserForm;