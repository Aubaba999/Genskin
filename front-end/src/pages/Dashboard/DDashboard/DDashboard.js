import React, { useState } from "react";
import "./DDashboard.css";
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
  FiUsers,
  FiSearch,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";

// Mock Data
const doctorData = {
  name: "Dr. Sarah Chen",
  id: "DR-2025-001",
  age: 38,
  specialty: "Dermatologist",
  avatarInitial: "SC",
};

const patientsData = [
  {
    id: "4135",
    name: "John Smith",
    avatarInitial: "JS",
    status: "รอประเมิน",
    lastVisit: "Jan 15, 2025",
  },
  {
    id: "4136",
    name: "Emily Johnson",
    avatarInitial: "EJ",
    status: "รอประเมิน",
    lastVisit: "Jan 12, 2025",
  },
  {
    id: "4137",
    name: "Michael Lee",
    avatarInitial: "ML",
    status: "รอประเมิน",
    lastVisit: "Jan 10, 2025",
  },
];

const appointmentsData = [
  {
    day: "29",
    title: "Follow-up Consultation",
    patient: "John Smith - Skin Analysis Review",
    time: "Jan 29, 2025 at 2:00 PM",
    status: "Confirmed",
  },
  {
    day: "30",
    title: "Initial Consultation",
    patient: "Emily Johnson - Skin Condition Assessment",
    time: "Jan 30, 2025 at 10:30 AM",
    status: "Scheduled",
  },
];

const recentPatientsData = [
  {
    name: "John Smith",
    condition: "Acne Treatment",
    lastVisit: "Jan 15, 2025",
    status: "Improving",
  },
  {
    name: "Emily Johnson",
    condition: "Eczema Management",
    lastVisit: "Jan 12, 2025",
    status: "Stable",
  },
  {
    name: "Michael Lee",
    condition: "Psoriasis Treatment",
    lastVisit: "Jan 10, 2025",
    status: "Under Review",
  },
];

// Sub-Components
const Sidebar = () => (
  <aside className="pd-sidebar">
    <nav className="pd-sidebar-nav">
      <a href="#home" className="pd-nav-item active" aria-label="Dashboard">
        <FiHome />
      </a>
      <a href="#patients" className="pd-nav-item" aria-label="Patients">
        <FiUsers />
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

const Header = ({ doctor }) => (
  <header className="pd-app-header">
    <div className="logo">
      <img src="/images/logo.png" alt="GENSKIN Logo" />
    </div>
    <div className="pd-header-right">
      <div className="pd-patient-id">ID: {doctor.id}</div>
      <button className="pd-icon-button">
        <FiBell />
      </button>
      <div className="pd-user-profile">
        <div className="pd-user-avatar-placeholder">{doctor.avatarInitial}</div>
        <span className="pd-user-name">{doctor.name}</span>
      </div>
    </div>
  </header>
);

const DoctorInfo = ({ doctor }) => (
  <div className="pd-card pd-patient-info-card">
    <div className="pd-patient-avatar-placeholder">{doctor.avatarInitial}</div>
    <h2 className="pd-patient-name">{doctor.name}</h2>
    <p className="pd-patient-role">{doctor.specialty}</p>
    <div className="pd-patient-details">
      <p>
        <strong>Doctor ID:</strong> {doctor.id}
      </p>
      <p>
        <strong>Age:</strong> {doctor.age} years
      </p>
      <p>
        <strong>Specialty:</strong> {doctor.specialty}
      </p>
    </div>
  </div>
);

const AppointmentsCalendar = () => (
  <div className="pd-card">
    <div className="pd-calendar-header-container">
      <h3 className="pd-calendar-title">My Schedule</h3>
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
            [15, 29, 30].includes(date) ? "active" : ""
          }`}
        >
          {date}
        </div>
      ))}
    </div>
  </div>
);

const MyPatients = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsState, setPatientsState] = useState(patients);

  const filteredPatients = patientsState.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm)
  );

  // ฟังก์ชันสำหรับอัพเดทสถานะของผู้ป่วย
  const updatePatientStatus = (patientId, newStatus) => {
    setPatientsState(prevPatients =>
      prevPatients.map(p =>
        p.id === patientId ? { ...p, status: newStatus } : p
      )
    );
  };

  // ฟังก์ชันสำหรับดูประวัติ
  const handleViewHistory = (patientId) => {
    console.log(`View history for patient ${patientId}`);
    // เพิ่ม logic สำหรับดูประวัติตรงนี้
  };

  return (
    <div className="pd-card">
      <div className="pd-patients-header">
        <h3 className="pd-card-header">
          <FiUsers /> My Patients
        </h3>
        <button className="pd-add-patient-btn">
          <FiPlus /> Add Patient
        </button>
      </div>

      <div className="pd-search-container">
        <FiSearch className="pd-search-icon" />
        <input
          type="text"
          placeholder="Search patients..."
          className="pd-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pd-patients-list">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="pd-patient-item">
            <div className="pd-patient-avatar-placeholder small">
              {patient.avatarInitial}
            </div>
            <div className="pd-patient-info">
              <p className="pd-patient-name-list">{patient.name}</p>
              <p className="pd-patient-id-list">ID: {patient.id}</p>
            </div>
            <div className="pd-patient-actions">
              <select
                className={`pd-status-select ${
                  patient.status === "เลือกสถานะ"
                    ? "pending"
                    : patient.status === "เสร็จสิ้น"
                    ? "completed"
                    : patient.status === "รอประเมิน"
                    ? "in-progress"
                    : ""
                }`}
                value={patient.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  updatePatientStatus(patient.id, newStatus);
                  console.log(`Patient ${patient.id} status changed to: ${newStatus}`);
                }}
              >
                <option value="เลือกสถานะ">เลือกสถานะ</option>
                <option value="รอประเมิน">รอประเมิน</option>
                <option value="เสร็จสิ้น">เสร็จสิ้น</option>
              </select>
              <button
                className="pd-history-btn"
                onClick={() => handleViewHistory(patient.id)}
                title="ดูประวัติการประเมิน"
              >
                <FiClock />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
            <p className="pd-appt-doctor">{appt.patient}</p>
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
      <button
        className="pd-take-photo-btn"
        onClick={() => setCurrentPage && setCurrentPage("camera")}
      >
        <FiCamera /> Analysis Tools
      </button>
      <p className="pd-analysis-caption">Access patient skin analysis tools</p>
    </div>
  </div>
);

const AnalysisResults = () => (
  <div className="pd-card">
    <h3 className="pd-card-header">Analysis Tools</h3>
    <div className="pd-analysis-results-grid">
      <div className="pd-result-item">
        <FiImage className="pd-result-icon" />
        <span>Image Analysis</span>
      </div>
      <div className="pd-result-item">
        <FiZoomIn className="pd-result-icon" />
        <span>Enhanced View</span>
      </div>
      <div className="pd-result-item">
        <FiFileText className="pd-result-icon" />
        <span>Generate Report</span>
      </div>
    </div>
  </div>
);

const SkinModel3D = () => (
  <div className="pd-card pd-skin-model-card">
    <h3 className="pd-card-header">3D Skin Model</h3>
    <div className="pd-model-placeholder">
      <FiBox className="pd-model-icon" />
      <p>3D Analysis Tool</p>
      <span>Patient skin modeling</span>
    </div>
  </div>
);

const RecentPatients = ({ patients }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiClock /> Recent Patients
    </h3>
    <div className="pd-recent-patients-list">
      {patients.map((patient, index) => (
        <div key={index} className="pd-recent-patient-item">
          <div className="pd-patient-basic-info">
            <p className="pd-patient-name-recent">{patient.name}</p>
            <p className="pd-patient-condition">{patient.condition}</p>
            <p className="pd-patient-last-visit">
              Last visit: {patient.lastVisit}
            </p>
          </div>
          <div
            className={`pd-patient-status-badge ${patient.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {patient.status}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const DoctorDashboard = ({
  currentUser,
  setCurrentPage,
  setCurrentDoctorId,
  setChatType,
}) => {
  const doctor = currentUser || doctorData;

  return (
    <div className="pd-main-container">
      <Sidebar />
      <div className="pd-content-wrapper">
        <Header doctor={doctor} />
        <main className="pd-main-content">
          <div className="pd-left-column">
            <DoctorInfo doctor={doctor} />
            <AppointmentsCalendar />
            <MyPatients patients={patientsData} />
          </div>
          <div className="pd-right-column">
            <UpcomingAppointments appointments={appointmentsData} />
            <SkinAnalysisSystem setCurrentPage={setCurrentPage} />
            <div className="pd-analysis-section">
              <AnalysisResults />
              <SkinModel3D />
            </div>
            <RecentPatients patients={recentPatientsData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;