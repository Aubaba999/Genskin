import React, { useState } from 'react';
import './FoundDoctorProfile.css'; // สร้างไฟล์ CSS ใหม่

function FoundDoctorProfile({ doctorId, setCurrentPage }) {
  // Mock doctor data - replace with actual data fetching in a real app
  const doctorData = {
    id: doctorId, // Use the passed doctorId
    name: "นายแพทย์ กิตติภูมิ หนูอุดม",
    clinic: "คลินิกเวชกรรม สุขใจ",
    address: "123 ซอย สุขภาพดี 5\nแขวง บางรัก เขต บางรัก\nกรุงเทพมหานคร 10500",
    imageUrl: "https://placehold.co/300x400/244D67/ffffff?text=Doctor+Profile", // Placeholder image
  };

  const [messageVisible, setMessageVisible] = useState(false);

  const handleSendRequest = () => {
    // Logic to send request to doctor
    console.log(`Sending request to doctor: ${doctorData.name}`);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
      // Optionally navigate back to patient dashboard or another page
      // setCurrentPage('patient-dashboard'); 
    }, 3000); // Hide message after 3 seconds
  };

  return (
    <div className="found-doctor-profile">
      {/* Header - Reusing a simplified header here for consistency, or you can integrate the main header */}
      <div className="profile-header">
        {/* Placeholder for logo */}
        <div className="logo-text">GENSKIN</div>
        <div className="header-right">
          <span className="manual-link">คู่มือการใช้งาน</span>
          {/* Placeholder for bell icon */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.243 2 7 4.243 7 7v4.586l-2.707 2.707C4.195 14.207 4 14.441 4 14.707V16h16v-1.293c0-.266-.195-.5-.293-.707L17 11.586V7c0-2.757-2.243-5-5-5zM12 22c1.103 0 2-.897 2-2h-4c0 1.103.897 2 2 2z"/>
          </svg>
          <div className="user-icon">Ex</div>
        </div>
      </div>

      <div className="profile-content">
        <h2 className="profile-title">ยินดีด้วย! <br /> คุณพบแพทย์แล้ว</h2>
        
        <div className="doctor-card-container">
          <div className="doctor-image-container">
            <img src={doctorData.imageUrl} alt="Doctor Profile" className="doctor-profile-image" />
          </div>
          <div className="doctor-info">
            <h3 className="doctor-name">{doctorData.name}</h3>
            <p className="doctor-clinic">
              <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              {doctorData.clinic}
            </p>
            <p className="doctor-address">{doctorData.address}</p>
            <button className="send-request-btn" onClick={handleSendRequest}>ส่งคำขอ</button>
            {messageVisible && (
              <div className="success-message">
                ส่งคำขอเรียบร้อยแล้ว!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoundDoctorProfile;
