import React, { useRef, useState, useEffect } from 'react';
import './CameraPage.css';

function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('');
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [faceInFrame, setFaceInFrame] = useState(false); // สำหรับเก็บสถานะว่าหน้าอยู่ในกรอบไหม

  // ตรวจจับการออกจากหน้าเว็บ
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    const handleBeforeUnload = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    const handlePageHide = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [stream]);

  // เปิด/ปิดกล้องตามสถานะหน้าเว็บ
  useEffect(() => {
    if (isPageVisible) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isPageVisible]);

  // Face detection simulation
  useEffect(() => {
    let interval;
    if (isCameraOn && isPageVisible) {
      interval = setInterval(() => {
        simulateFaceDetection();
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isCameraOn, isPageVisible]);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("ไม่สามารถเปิดกล้องได้:", err);
      alert("ไม่สามารถเปิดกล้องได้");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCameraOn(false);
      setFaceDetected(false);
      setFaceInFrame(false);
    }
  };

  // จำลองการตรวจจับใบหน้า
  const simulateFaceDetection = () => {
    // สุ่มสถานะการตรวจจับใบหน้า
    const detected = Math.random() > 0.3;
    setFaceDetected(detected);
    
    if (detected) {
      // จำลองตำแหน่งใบหน้า
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const faceX = centerX + (Math.random() - 0.5) * 200;
      const faceY = centerY + (Math.random() - 0.5) * 200;
      
      setFacePosition({ x: faceX, y: faceY });
      
      // คำนวณทิศทางที่ควรขยับ
      const deltaX = centerX - faceX;
      const deltaY = centerY - faceY;
      const threshold = 50;
      
      let newDirection = '';
      let inFrame = false;
      
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newDirection = deltaX > 0 ? 'หันซ้าย' : 'หันขวา';
        } else {
          newDirection = deltaY > 0 ? 'หันขึ้น' : 'หันลง';
        }
        inFrame = false;
      } else {
        newDirection = 'ตำแหน่งดี!';
        inFrame = true;
      }
      
      setDirection(newDirection);
      setFaceInFrame(inFrame);
    } else {
      setDirection('กรุณาเอาใบหน้าเข้าในกรอบ');
      setFaceInFrame(false);
    }
  };

  const goHome = () => {
    stopCamera();
    // นี่คือที่ที่คุณจะเพิ่มการนำทางไปหน้า home
    // เช่น router.push('/home') หรือ navigate('/home')
    console.log('Navigate to home');
  };

  return (
    <div className="camera-container">
      {/* ปุ่มย้อนกลับ */}
      <button 
        onClick={goHome}
        className="back-button"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
      </button>

      {/* วิดีโอ */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />

      {/* Green Overlay เมื่อหน้าอยู่ในกรอบ */}
      {faceInFrame && (
        <div className="green-overlay"></div>
      )}

      {/* Canvas สำหรับการประมวลผล */}
      <canvas
        ref={canvasRef}
        className="camera-canvas"
      />

      {/* กรอบตรวจจับใบหน้า */}
      <div className="scan-frame-container">
        <div className="scan-frame-wrapper">
          {/* กรอบหลัก */}
          <div className="scan-frame">
            {/* มุมกรอบ */}
            <div className="scan-corners">
              {/* มุมซ้ายบน */}
              <div 
                className={`corner corner-tl ${
                  faceInFrame ? 'corner-success' : 'corner-default'
                }`}
              />
              {/* มุมขวาบน */}
              <div 
                className={`corner corner-tr ${
                  faceInFrame ? 'corner-success' : 'corner-default'
                }`}
              />
              {/* มุมซ้ายล่าง */}
              <div 
                className={`corner corner-bl ${
                  faceInFrame ? 'corner-success' : 'corner-default'
                }`}
              />
              {/* มุมขวาล่าง */}
              <div 
                className={`corner corner-br ${
                  faceInFrame ? 'corner-success' : 'corner-default'
                }`}
              />
            </div>
            
            {/* ขอบของกรอบ */}
            <div className={`frame-border ${faceInFrame ? 'frame-border-success' : 'frame-border-default'}`}></div>
          </div>
          
          {/* ข้อความแนะนำ */}
          <div className="direction-text">
            <div 
              className={`direction-message ${
                faceInFrame ? 'direction-success' : 'direction-default'
              }`}
            >
              {direction || 'กำลังตรวจจับใบหน้า...'}
            </div>
          </div>
        </div>
      </div>

      {/* สถานะกล้อง */}
      {!isPageVisible && (
        <div className="camera-paused">
          <div className="camera-paused-content">
            <div className="camera-paused-icon">📷</div>
            <div>กล้องหยุดทำงานเมื่อออกจากหน้าเว็บ</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraPage;