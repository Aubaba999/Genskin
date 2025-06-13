import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './components/RoleSelection';
import FillDoctorForm from './pages/FillDoctorForm';
import FillUserForm from './pages/FillUserForm';
import PatientDashboard from './pages/PatientDashboard'; // เพิ่ม import

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'contact': return <Contact />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'login': return <Login setCurrentPage={setCurrentPage} />;
      case 'register': return <Register setCurrentPage={setCurrentPage} />;
      case 'role-selection': return <RoleSelection setCurrentPage={setCurrentPage} />;
      case 'fill-doctor': return <FillDoctorForm />;
      case 'fill-user': return <FillUserForm />;
      case 'patient-dashboard': return <PatientDashboard />; // เพิ่ม case ใหม่
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {currentPage !== 'patient-dashboard' && <Header setCurrentPage={setCurrentPage} />}
      {renderPage()}
      {currentPage !== 'patient-dashboard' && <Footer />}
    </div>
  );
}

export default App;