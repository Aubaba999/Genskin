import React from "react";
import "./PDashboard.css";

import {
  FiHome,
  FiUser,
  FiCalendar,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiBell,
  FiCamera,
  FiImage,
  FiZoomIn,
  FiFileText,
  FiBox,
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";

// Mock Data
const patientData = {
  name: "John Smith",
  id: "PT-2025-001",
  age: 32,
  bloodType: "O+",
  avatarInitial: "JS",
};
const appointmentsData = [
  {
    day: "29",
    title: "Analysis Results Review",
    doctor: "Dr. Sarah Chen - Dermatology",
    time: "Jan 29, 2025 at 2:00 PM",
    status: "Confirmed",
  },
  {
    day: "15",
    title: "Follow-up Consultation",
    doctor: "Dr. Sarah Chen - Dermatology",
    time: "Feb 15, 2025 at 10:30 AM",
    status: "Scheduled",
  },
];
const doctorsData = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    next: "Next: Jan 29, 2025",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "General Practitioner",
    next: "Last visit: Dec 15, 2024",
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Oncologist",
    next: "Last visit: Nov 20, 2024",
  },
];

// Sub-Components
// โค้ดใหม่ที่แนะนำ
const Sidebar = () => (
  <aside className="pd-sidebar">
    {/* เราจะใช้ <nav> เพียงอันเดียวเพื่อความเรียบง่ายในการทำ responsive */}
    <nav className="pd-sidebar-nav">
      <a href="#home" className="pd-nav-item active" aria-label="Dashboard">
        <FiHome />
      </a>
      <a href="#profile" className="pd-nav-item" aria-label="Profile">
        <FiUser />
      </a>
      <a href="#appointments" className="pd-nav-item" aria-label="Appointments">
        <FiCalendar />
      </a>
    </nav>
    <div className="pd-sidebar-footer">
      <a href="#settings" className="pd-nav-item" aria-label="Settings">
        <FiSettings />
      </a>
      <a href="#logout" className="pd-nav-item" aria-label="Log Out">
        <FiLogOut />
      </a>
    </div>
  </aside>
);
const Header = ({ patient }) => (
  <header className="pd-app-header">
    <div className="logo" onClick={PatientDashboard}>
        <img src="/images/logo.png" alt="GENSKIN Logo" />
      </div>
    <div className="pd-header-right">
      <div className="pd-patient-id">ID: {patient.id}</div>
      <button className="pd-icon-button">
        <FiBell />
      </button>
      <div className="pd-user-profile">
        <div className="pd-user-avatar-placeholder">
          {patient.avatarInitial}
        </div>
        <span className="pd-user-name">{patient.name}</span>
      </div>
    </div>
  </header>
);

const PatientInfo = ({ patient }) => (
  <div className="pd-card pd-patient-info-card">
    <div className="pd-patient-avatar-placeholder">{patient.avatarInitial}</div>
    <h2 className="pd-patient-name">{patient.name}</h2>
    <p className="pd-patient-role">Patient</p>
    <div className="pd-patient-details">
      <p>
        <strong>Patient ID:</strong> {patient.id}
      </p>
      <p>
        <strong>Age:</strong> {patient.age} years
      </p>
      <p>
        <strong>Blood Type:</strong> {patient.bloodType}
      </p>
    </div>
  </div>
);

const AppointmentsCalendar = () => (
  <div className="pd-card">
    <div className="pd-calendar-header-container">
      <h3 className="pd-calendar-title">My Appointments</h3>
      <span className="pd-calendar-month">January 2025</span>
    </div>
    <div className="pd-calendar-grid">
      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
        <div key={day} className="pd-calendar-day-name">
          {day}
        </div>
      ))}
      <div />
      <div />
      <div />
      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
        <div
          key={date}
          className={`pd-calendar-day ${
            [8, 29].includes(date) ? "active" : ""
          }`}
        >
          {date}
        </div>
      ))}
    </div>
  </div>
);

const MyDoctors = ({ doctors }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiUser /> My Doctors
    </h3>
    <div className="pd-doctor-list">
      {doctors.map((doc, index) => (
        <div key={index} className="pd-doctor-item">
          <div className="pd-doctor-avatar-placeholder"></div>
          <div className="pd-doctor-info">
            <p className="pd-doctor-name">{doc.name}</p>
            <p className="pd-doctor-specialty">{doc.specialty}</p>
            <p className="pd-doctor-visit">{doc.next}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UpcomingAppointments = ({ appointments }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiCalendar /> Upcoming Appointments
    </h3>
    <div className="pd-appointments-list">
      {appointments.map((appt, index) => (
        <div key={index} className="pd-appointment-item">
          <div className="pd-appt-date-box">{appt.day}</div>
          <div className="pd-appt-details">
            <p className="pd-appt-title">{appt.title}</p>
            <p className="pd-appt-doctor">{appt.doctor}</p>
            <p className="pd-appt-time">{appt.time}</p>
          </div>
          <div className={`pd-appt-status ${appt.status.toLowerCase()}`}>
            {appt.status}
          </div>
        </div>
      ))}
    </div>
  </div>
);
const SkinAnalysisSystem = ({ setCurrentPage }) => (
  <div className="pd-card pd-skin-analysis-card">
    <h3 className="pd-card-header">
      <BsShieldCheck /> Skin Analysis System
    </h3>
    <div className="pd-analysis-content">
      <div className="pd-camera-icon-wrapper">
        <FiCamera size={48} />
      </div>
      {/* 2. เพิ่ม onClick เพื่อเรียกใช้ฟังก์ชันที่รับมา */}
      <button
        className="pd-take-photo-btn"
        onClick={() => setCurrentPage("camera")}
      >
        <FiCamera /> Take Photo for Analysis
      </button>
      <p className="pd-analysis-caption">
        Capture your skin condition for medical analysis
      </p>
    </div>
  </div>
);

const MyAnalysisResults = () => (
  <div className="pd-card">
    <h3 className="pd-card-header">My Analysis Results</h3>
    <div className="pd-analysis-results-grid">
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Original Photo</span>
      </div>
      <div className="pd-result-item">
        <FiZoomIn className="pd-result-icon" />
        <span>Enhanced View</span>
      </div>
      <div className="pd-result-item">
        <FiFileText className="pd-result-icon" />
        <span>Analysis Report</span>
      </div>
    </div>
  </div>
);

const SkinModel3D = () => (
  <div className="pd-card pd-skin-model-card">
    <h3 className="pd-card-header">3D Skin Model</h3>
    <div className="pd-model-placeholder">
      <FiBox className="pd-model-icon" />
      <p>3D Skin Model</p>
      <span>Generated after analysis</span>
    </div>
  </div>
);

const DoctorNotes = () => (
  <div className="pd-card">
    <div className="pd-notes-header">
      <div className="pd-doctor-avatar-placeholder small"></div>
      <div>
        <p className="pd-notes-doctor-name">
          Dr. Sarah Chen <span className="pd-notes-date">Jan 5, 2025</span>
        </p>
      </div>
    </div>
    <div className="pd-notes-content">
      <p>
        Based on the analysis results, I recommend continuing with the
        prescribed topical treatment. The skin condition shows improvement.
        Please schedule a follow-up appointment in 2 weeks.
      </p>
      <p>
        <strong>Prescribed Medications:</strong>
      </p>
      <ul className="pd-medication-list">
        <li>Tretinoin 0.025% cream - Apply once daily at night</li>
        <li>Benzoyl peroxide 2.5% gel - Apply twice daily</li>
        <li>Gentle moisturizer - Use as needed</li>
      </ul>
    </div>
  </div>
);

// Main Component
const PatientDashboard = ({
  currentUser,
  setCurrentPage, // ฟังก์ชันนี้ถูกรับเข้ามาที่นี่
  setCurrentDoctorId,
  setChatType,
}) => {
  const patient = currentUser || patientData;

  return (
    <div className="pd-main-container">
      <Sidebar />
      <div className="pd-content-wrapper">
        <Header patient={patient} />
        <main className="pd-main-content">
          <div className="pd-left-column">
            <PatientInfo patient={patient} />
            <AppointmentsCalendar />
            <MyDoctors doctors={doctorsData} />
          </div>
          <div className="pd-right-column">
            <UpcomingAppointments appointments={appointmentsData} />
            <SkinAnalysisSystem setCurrentPage={setCurrentPage} />

            <div className="pd-analysis-section">
              <MyAnalysisResults />
              <SkinModel3D />
            </div>
            <DoctorNotes />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
