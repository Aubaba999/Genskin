import React from "react";

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

export default AppointmentsCalendar;