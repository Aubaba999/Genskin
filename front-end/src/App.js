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
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import FoundDoctorProfile from './pages/FoundDoctorProfile';
import ChatPage from './pages/ChatPage';
import CameraPage from './pages/CameraPage';
import History from './pages/History';
import PersonalInformation from './pages/PersonalInformation';
import Calendar from './pages/Calendar';
import Suggestion from './pages/Suggestion';
import SignOut from './pages/SignOut';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null); // <<== เพิ่มตรงนี้
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const [chatType, setChatType] = useState('patient');
  

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'contact': return <Contact />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'login': return <Login setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser} />; // <<== ส่ง setCurrentUser
      case 'register': return <Register setCurrentPage={setCurrentPage} />;
      case 'role-selection': return <RoleSelection setCurrentPage={setCurrentPage} />;
      case 'fill-doctor': return <FillDoctorForm />;
      case 'fill-user': return <FillUserForm />;
      case 'patient-dashboard': return (
        <PatientDashboard
          setCurrentPage={setCurrentPage}
          setCurrentDoctorId={setCurrentDoctorId}
          setChatType={setChatType}
          currentUser={currentUser} // <<== ส่ง currentUser ไปหน้า dashboard
        />
      );
      case 'doctor-dashboard': return (
        <DoctorDashboard
          setCurrentPage={setCurrentPage}
          setChatType={setChatType}
          currentUser={currentUser}
        />
      );
      case 'found-doctor-profile': return (
        <FoundDoctorProfile doctorId={currentDoctorId} setCurrentPage={setCurrentPage} />
      );
      case 'chat': return <ChatPage chatType={chatType} />;
      case 'camera': return <CameraPage />;
      case 'patient-history': return <History />;
      case 'patient-profile': return <PersonalInformation />;
      case 'patient-calendar': return <Calendar />;
      case 'feedback': return <Suggestion />;
      case 'sign-out': return <SignOut />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // ซ่อน Header/Footer บางหน้า
  const showHeaderFooter = currentPage !== 'patient-dashboard' &&
                           currentPage !== 'doctor-dashboard' &&
                           currentPage !== 'chat' &&
                           currentPage !== 'found-doctor-profile' &&
                           currentPage !== 'camera';

  return (
    <div className="app">
      {showHeaderFooter && <Header setCurrentPage={setCurrentPage} />}
      {renderPage()}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
