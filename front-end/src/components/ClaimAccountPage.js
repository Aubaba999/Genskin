// ClaimAccountPage.jsx: Component สำหรับการ Claim บัญชีผู้ป่วย
// ไฟล์นี้ควรอยู่ใน src/components/ClaimAccountPage.jsx

import React, { useState } from "react";
// นี่คือบรรทัดที่สำคัญที่สุด! ต้องแน่ใจว่า import จาก ModalStyles.css ที่อยู่ใน src/components/
// ถ้า ClaimAccountPage.jsx และ ModalStyles.css อยู่ใน src/components/ เหมือนกัน Path จะเป็น './ModalStyles.css'
import "./ModalStyles.css"; 
import { FiCheckCircle } from "react-icons/fi"; // อาจจะต้องใช้ไอคอนเมื่อรหัสถูกต้อง

const ClaimAccountPage = ({ setCurrentPage, onAccountClaimed, patientsDatabase }) => { // รับ patientsDatabase มาด้วย
  const [isClaimCodeModalOpen, setIsClaimCodeModalOpen] = useState(true);
  const [claimCodeInput, setClaimCodeInput] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false); // สถานะว่ารหัสถูกต้องหรือไม่
  const [patientDetails, setPatientDetails] = useState(null); // เก็บข้อมูลคนไข้ที่ดึงมาจากรหัส
  const [validationError, setValidationError] = useState(""); // สำหรับแสดง Error ของรหัส Claim

  // State สำหรับ Form สร้างบัญชี
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to validate claim code and fetch patient info
  const validateClaimCode = (code) => {
    // ใช้ patientsDatabase ที่ส่งมาจาก App.js ในการตรวจสอบรหัส
    const foundPatient = patientsDatabase.find(
      (p) => p.claimCode === code && !p.isClaimed
    );
    return foundPatient || null;
  };

  const handleClaimCodeSubmit = (e) => {
    e.preventDefault();
    setValidationError(""); // Clear previous error

    if (!claimCodeInput || claimCodeInput.length !== 5) {
      setValidationError('Please enter a valid 5-digit code.');
      return;
    }

    const patient = validateClaimCode(claimCodeInput.toUpperCase());
    if (patient) {
      setIsCodeValid(true);
      setPatientDetails(patient);
      setIsClaimCodeModalOpen(false); // ปิด Modal เมื่อรหัสถูกต้อง
    } else {
      setValidationError("Invalid or already claimed code. Please try again.");
      setIsCodeValid(false);
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setPasswordError(""); // Clear previous password error

    if (!email || !password || !confirmPassword) {
      setPasswordError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (password.length < 6) { // Firebase requires at least 6 characters for password
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    // In a real application, you'd send this data to your backend
    // to create the user account and link it to the patient ID
    console.log("Creating account for:", email, "with patient ID:", patientDetails.id);
    console.log("Claim Code used:", claimCodeInput.toUpperCase());

    // Simulate claiming the account
    // ส่งข้อมูลที่อัปเดตแล้วกลับไปให้ App.js เพื่ออัปเดต database
    onAccountClaimed({
      ...patientDetails,
      email,
      isClaimed: true,
      claimCode: null, // Clear claim code after claiming
    });
    alert("Account created and claimed successfully!"); // ใช้ alert ชั่วคราว
    setCurrentPage("patient-dashboard"); // ไปยัง Patient Dashboard
  };

  return (
    <div className="pd-main-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      {isClaimCodeModalOpen && (
        <div className="pd-modal-overlay">
          <div className="pd-modal-content">
            <div className="pd-modal-header">
              <h3>Enter Your Claim Code</h3>
              {/* ไม่มีปุ่มปิด เพื่อบังคับให้ใส่รหัส */}
            </div>
            <form className="pd-modal-form" onSubmit={handleClaimCodeSubmit}>
              <div className="pd-form-group" style={{ textAlign: 'center' }}>
                <label>Please enter the 5-digit code provided by your doctor:</label>
                <input
                  type="text"
                  placeholder="e.g., A7J25"
                  value={claimCodeInput}
                  onChange={(e) => setClaimCodeInput(e.target.value)}
                  maxLength="5"
                  style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '3px' }}
                  required
                />
                {validationError && <p style={{ color: 'red', marginTop: '10px' }}>{validationError}</p>}
              </div>
              <div className="pd-modal-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
                <button type="submit" className="pd-btn-submit">
                  Submit Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCodeValid && ( // แสดง Form เมื่อรหัสถูกต้อง
        <div className="pd-main-content" style={{ display: 'block', maxWidth: '500px' }}> {/* ใช้ style ตรงๆ เพื่อให้มันอยู่กลางๆ */}
          <div className="pd-card">
            <h3 className="pd-card-header">Create Your Account</h3>
            <p style={{ color: 'var(--pd-text-secondary)', marginBottom: '20px' }}>
              You are claiming the account for: <strong>{patientDetails.name} (ID: {patientDetails.id})</strong>
            </p>
            <form className="pd-modal-form" onSubmit={handleCreateAccount}>
              <div className="pd-form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="pd-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="pd-form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>}
              </div>
              <div className="pd-modal-actions">
                <button type="submit" className="pd-btn-submit">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimAccountPage;
