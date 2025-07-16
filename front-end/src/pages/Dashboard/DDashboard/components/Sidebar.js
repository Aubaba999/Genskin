import React from "react";
import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";

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

export default Sidebar;