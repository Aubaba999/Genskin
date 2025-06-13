import React from 'react';
import './Login.css';

function Login({ setCurrentPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('role-selection');
  };

  return (
    <div className="login-page">
      <h1>GENSKIN</h1>
      <h2>เข้าสู่ระบบ</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>อีเมล</label>
          <input type="email" placeholder="example@gmail.com" />
        </div>
        
        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input type="password" placeholder="********" />
        </div>
        
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
      
      <p className='register-link'>
        ยังไม่มีบัญชีใช่ไหม? 
        <span onClick={() => setCurrentPage('register')}>ลงทะเบียนที่นี่</span>
      </p>
    </div>
  );
}

export default Login;