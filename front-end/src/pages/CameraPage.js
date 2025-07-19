import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./CameraPage.css";

// Import Components
import ProgressIndicator from "../components/ProgressIndicator";
import SessionCompleteOverlay from "../components/SessionCompleteOverlay";
import BackButton from "../components/BackButton";
import LightingIndicator from "../components/LightingIndicator";
import GlassesIndicator from "../components/GlassesIndicator";
import ScanFrame from "../components/ScanFrame";
import CameraStatus from "../components/CameraStatus";
import LoadingIndicator from "../components/LoadingIndicator";

function CameraPage({ setCurrentPage, currentUser }) { // เพิ่ม props
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const stableTimeoutRef = useRef(null);

  // State
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("");
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [faceInFrame, setFaceInFrame] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lightingCondition, setLightingCondition] = useState("good");
  const [autoCapture, setAutoCapture] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCapturedImage, setShowCapturedImage] = useState(false);
  const [stableFrameCount, setStableFrameCount] = useState(0);
  const [isCountingStable, setIsCountingStable] = useState(false);
  const [hasGlasses, setHasGlasses] = useState(false);
  const [glassesCheckCount, setGlassesCheckCount] = useState(0);
  const [currentPose, setCurrentPose] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [poseInstructions] = useState([
    "กรุณาหันหน้าตรง",
    "กรุณาหันหน้าไปทางซ้าย (30-60 องศา)",
    "กรุณาหันหน้าไปทางขวา (30-60 องศา)",
  ]);

  // Face detection functions
  const detectFacePose = (landmarks) => {
    if (!landmarks || !landmarks.positions) return "unknown";

    try {
      const positions = landmarks.positions;
      const nose = positions[30];
      const leftEye = positions[36];
      const rightEye = positions[45];
      const leftEyeInner = positions[39];
      const rightEyeInner = positions[42];
      const leftMouth = positions[48];
      const rightMouth = positions[54];
      const chinCenter = positions[8];

      const leftEyeCenter = {
        x: (leftEye.x + leftEyeInner.x) / 2,
        y: (leftEye.y + leftEyeInner.y) / 2,
      };

      const rightEyeCenter = {
        x: (rightEye.x + rightEyeInner.x) / 2,
        y: (rightEye.y + rightEyeInner.y) / 2,
      };

      const eyeCenter = {
        x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
        y: (leftEyeCenter.y + rightEyeCenter.y) / 2,
      };

      const mouthCenter = {
        x: (leftMouth.x + rightMouth.x) / 2,
        y: (leftMouth.y + rightMouth.y) / 2,
      };

      const eyeDistance = Math.abs(rightEyeCenter.x - leftEyeCenter.x);
      const noseToEyeCenterX = nose.x - eyeCenter.x;
      const noseOffsetRatio = noseToEyeCenterX / eyeDistance;

      const mouthToEyeCenterX = mouthCenter.x - eyeCenter.x;
      const mouthOffsetRatio = mouthToEyeCenterX / eyeDistance;

      const leftEyeWidth = Math.abs(leftEyeInner.x - leftEye.x);
      const rightEyeWidth = Math.abs(rightEyeInner.x - rightEye.x);
      const eyeWidthRatio = (leftEyeWidth - rightEyeWidth) / Math.max(leftEyeWidth, rightEyeWidth);

      const chinToEyeCenterX = chinCenter.x - eyeCenter.x;
      const chinOffsetRatio = chinToEyeCenterX / eyeDistance;

      const frontThreshold = 0.06;
      const turnThreshold = 0.1;

      const leftTurnScore = (noseOffsetRatio < -frontThreshold ? 1 : 0) +
                          (mouthOffsetRatio < -frontThreshold ? 1 : 0) +
                          (eyeWidthRatio > 0.12 ? 1 : 0) +
                          (chinOffsetRatio < -frontThreshold ? 1 : 0);

      const rightTurnScore = (noseOffsetRatio > frontThreshold ? 1 : 0) +
                           (mouthOffsetRatio > frontThreshold ? 1 : 0) +
                           (eyeWidthRatio < -0.12 ? 1 : 0) +
                           (chinOffsetRatio > frontThreshold ? 1 : 0);

      if (leftTurnScore >= 2) return "left";
      if (rightTurnScore >= 2) return "right";
      
      const isFrontFacing = Math.abs(noseOffsetRatio) < frontThreshold &&
                          Math.abs(mouthOffsetRatio) < frontThreshold &&
                          Math.abs(eyeWidthRatio) < 0.15;

      return isFrontFacing ? "front" : "unknown";
    } catch (error) {
      console.error("Error detecting face pose:", error);
      return "unknown";
    }
  };

  const isPoseCorrect = (detectedPose, requiredPose) => {
    const poseMap = {
      0: "front",
      1: "left",
      2: "right",
    };
    return detectedPose === poseMap[requiredPose];
  };

  const detectGlasses = (landmarks) => {
    if (!landmarks || !landmarks.positions) return false;

    try {
      const positions = landmarks.positions;
      const leftEye = positions.slice(36, 42);
      const rightEye = positions.slice(42, 48);
      const noseBridge = positions.slice(27, 31);
      const eyebrows = positions.slice(17, 27);

      const video = videoRef.current;
      if (!video) return false;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      let totalBrightness = 0;
      let pixelCount = 0;

      [...leftEye, ...rightEye].forEach((point) => {
        const x = Math.floor(point.x);
        const y = Math.floor(point.y);

        for (let dx = -5; dx <= 5; dx++) {
          for (let dy = -5; dy <= 5; dy++) {
            const px = x + dx;
            const py = y + dy;

            if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
              const imageData = context.getImageData(px, py, 1, 1);
              const data = imageData.data;
              const brightness = 0.299 * data[0] + 0.587 * data[1] + 0.114 * data[2];
              totalBrightness += brightness;
              pixelCount++;
            }
          }
        }
      });

      const avgBrightness = totalBrightness / pixelCount;

      const leftEyeCenter = {
        x: leftEye.reduce((sum, p) => sum + p.x, 0) / leftEye.length,
        y: leftEye.reduce((sum, p) => sum + p.y, 0) / leftEye.length,
      };

      const rightEyeCenter = {
        x: rightEye.reduce((sum, p) => sum + p.x, 0) / rightEye.length,
        y: rightEye.reduce((sum, p) => sum + p.y, 0) / rightEye.length,
      };

      const eyeDistance = Math.sqrt(
        Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
        Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
      );

      const leftEyeHeight = Math.max(...leftEye.map((p) => p.y)) - Math.min(...leftEye.map((p) => p.y));
      const rightEyeHeight = Math.max(...rightEye.map((p) => p.y)) - Math.min(...rightEye.map((p) => p.y));
      const avgEyeHeight = (leftEyeHeight + rightEyeHeight) / 2;

      const hasReflection = avgBrightness > 180;
      const eyeHeightRatio = avgEyeHeight / eyeDistance;
      const isEyeShapeNormal = eyeHeightRatio > 0.08 && eyeHeightRatio < 0.25;

      const glassesIndicators = [hasReflection, !isEyeShapeNormal];
      const glassesScore = glassesIndicators.filter(Boolean).length;

      return glassesScore >= 1;
    } catch (error) {
      console.error("Error detecting glasses:", error);
      return false;
    }
  };

  const processFaceDetections = (detections, displaySize) => {
    if (detections.length > 0) {
      setFaceDetected(true);
      const detection = detections[0];
      const box = detection.detection.box;

      const faceCenterX = box.x + box.width / 2;
      const faceCenterY = box.y + box.height / 2;
      const frameCenterX = displaySize.width / 2;
      const frameCenterY = displaySize.height / 2;

      setFacePosition({ x: faceCenterX, y: faceCenterY });

      if (detection.landmarks) {
        const glassesDetected = detectGlasses(detection.landmarks);
        const detectedPose = detectFacePose(detection.landmarks);

        setGlassesCheckCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 10) {
            setHasGlasses(glassesDetected);
            return 0;
          }
          return newCount;
        });

        const poseCorrect = isPoseCorrect(detectedPose, currentPose);
        const deltaX = frameCenterX - faceCenterX;
        const deltaY = frameCenterY - faceCenterY;
        const threshold = 80;

        let newDirection = "";
        let inFrame = false;

        if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newDirection = deltaX > 0 ? "ขยับไปทางซ้าย" : "ขยับไปทางขวา";
          } else {
            newDirection = deltaY > 0 ? "ขยับขึ้น" : "ขยับลง";
          }
          inFrame = false;
        } else {
          if (hasGlasses) {
            newDirection = "กรุณาถอดแว่นตา";
            inFrame = false;
          } else if (!poseCorrect) {
            newDirection = poseInstructions[currentPose];
            inFrame = false;
          } else {
            newDirection = "ตำแหน่งดี!";
            inFrame = true;
          }
        }

        setDirection(newDirection);
        setFaceInFrame(inFrame && poseCorrect);
      }
    } else {
      setFaceDetected(false);
      setDirection("กรุณาเอาใบหน้าเข้าในกรอบ");
      setFaceInFrame(false);
      setHasGlasses(false);
    }
  };

  const detectLighting = (video) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalBrightness = 0;
    let pixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      totalBrightness += brightness;
      pixelCount++;
    }

    const avgBrightness = totalBrightness / pixelCount;

    if (avgBrightness < 40) return "low";
    if (avgBrightness > 200) return "high";
    return "good";
  };

  // Camera control functions
  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);

        videoRef.current.onloadedmetadata = () => {
          setIsCameraOn(true);
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
        };
      }
    } catch (err) {
      console.error("ไม่สามารถเปิดกล้องได้:", err);
      alert("ไม่สามารถเปิดกล้องได้");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCameraOn(false);
      setFaceDetected(false);
      setFaceInFrame(false);
      setHasGlasses(false);
      cancelCountdown();
    }
  };

  // Capture functions
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL("image/jpeg", 0.8);

    const newImage = {
      id: currentPose,
      pose: poseInstructions[currentPose],
      image: imageDataURL,
      timestamp: Date.now(),
    };

    setCapturedImages((prev) => [...prev, newImage]);
    setCapturedImage(imageDataURL);
    setShowCapturedImage(true);

    setTimeout(() => {
      setShowCapturedImage(false);
      setCapturedImage(null);

      if (currentPose < 2) {
        setCurrentPose((prev) => prev + 1);
        resetStatesForNextPose();
      } else {
        setIsSessionComplete(true);
      }
    }, 2000);
  };

  const resetStatesForNextPose = () => {
    setFaceInFrame(false);
    setStableFrameCount(0);
    setIsCountingStable(false);
    setAutoCapture(false);
    setCountdown(0);
    cancelCountdown();
  };

  const resetSession = () => {
    setCurrentPose(0);
    setCapturedImages([]);
    setIsSessionComplete(false);
    setCapturedImage(null);
    setShowCapturedImage(false);
    resetStatesForNextPose();
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (stableTimeoutRef.current) {
      clearTimeout(stableTimeoutRef.current);
      stableTimeoutRef.current = null;
    }
    setAutoCapture(false);
    setCountdown(0);
    setStableFrameCount(0);
    setIsCountingStable(false);
  };

  const startCountdown = () => {
    cancelCountdown();
    setCountdown(3);
    setAutoCapture(true);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          setAutoCapture(false);
          captureImage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Navigation - แก้ไขให้หยุดกล้องอย่างเดียว
  const goHome = () => {
    stopCamera();
  };

  // Effects
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
        try {
          await faceapi.nets.tinyFaceDetector.loadFromUri(
            "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights"
          );
          await faceapi.nets.faceLandmark68Net.loadFromUri(
            "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights"
          );
          await faceapi.nets.faceRecognitionNet.loadFromUri(
            "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights"
          );
          setIsModelLoaded(true);
        } catch (cdnError) {
          console.error("Error loading models from CDN:", cdnError);
          alert("ไม่สามารถโหลด Face Detection Models ได้");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    const handleBeforeUnload = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };

    const handlePageHide = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [stream]);

  useEffect(() => {
    if (isPageVisible && isModelLoaded) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isPageVisible, isModelLoaded]);

  useEffect(() => {
    let animationId;

    const detectFaces = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        isCameraOn &&
        isPageVisible &&
        isModelLoaded &&
        videoRef.current.readyState === 4
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          processFaceDetections(resizedDetections, displaySize);
          setLightingCondition(detectLighting(video));
        } catch (error) {
          console.error("Face detection error:", error);
        }
      }
      animationId = requestAnimationFrame(detectFaces);
    };

    if (isCameraOn && isModelLoaded) {
      detectFaces();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isCameraOn, isPageVisible, isModelLoaded, hasGlasses]);

  useEffect(() => {
    const isReadyForCapture =
      faceInFrame &&
      lightingCondition === "good" &&
      !showCapturedImage &&
      !hasGlasses;

    if (isReadyForCapture) {
      if (!isCountingStable) {
        setIsCountingStable(true);
        setStableFrameCount(0);

        stableTimeoutRef.current = setTimeout(() => {
          if (
            faceInFrame &&
            lightingCondition === "good" &&
            !showCapturedImage &&
            !hasGlasses
          ) {
            startCountdown();
          }
          setIsCountingStable(false);
        }, 3000);
      }
    } else {
      cancelCountdown();
    }
  }, [faceInFrame, lightingCondition, showCapturedImage, hasGlasses]);

  useEffect(() => {
    return () => {
      cancelCountdown();
    };
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="camera-container">
      <BackButton 
        onClick={goHome} 
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
      />

      <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
      <canvas ref={canvasRef} className="camera-canvas" />

      {faceInFrame && !autoCapture && !hasGlasses && (
        <div className="green-overlay"></div>
      )}

      {hasGlasses && (
        <div className="glasses-warning-overlay">
          <div className="glasses-warning-content">
            <div className="glasses-warning-icon">👓</div>
            <div className="glasses-warning-text">กรุณาถอดแว่นตา</div>
            <div className="glasses-warning-subtext">
              เพื่อความแม่นยำในการตรวจจับใบหน้า
            </div>
          </div>
        </div>
      )}

      {autoCapture && countdown > 0 && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
          <div className="countdown-text">กำลังถ่ายภาพ...</div>
        </div>
      )}

      {isCountingStable && !autoCapture && !hasGlasses && (
        <div className="preparation-overlay">
          <div className="preparation-text">กำลังเตรียมถ่ายภาพ...</div>
          <div className="preparation-subtext">กรุณาอยู่นิ่งในกรอบ</div>
        </div>
      )}

      {showCapturedImage && capturedImage && (
        <div className="captured-image-overlay">
          <div className="captured-image-container">
            <img
              src={capturedImage}
              alt="Captured"
              className="captured-image"
            />
            <div className="captured-message">📸 ถ่ายภาพสำเร็จ!</div>
          </div>
        </div>
      )}

      <LightingIndicator lightingCondition={lightingCondition} />
      <GlassesIndicator hasGlasses={hasGlasses} />
      <ScanFrame
        faceInFrame={faceInFrame}
        hasGlasses={hasGlasses}
        direction={direction}
        isCountingStable={isCountingStable}
      />
      <CameraStatus isPageVisible={isPageVisible} />

      {!isSessionComplete && (
        <ProgressIndicator
          currentPose={currentPose}
          poseInstructions={poseInstructions}
        />
      )}
      {isSessionComplete && (
        <SessionCompleteOverlay
          capturedImages={capturedImages}
          resetSession={resetSession}
          goHome={goHome}
          poseInstructions={poseInstructions}
        />
      )}
    </div>
  );
}

export default CameraPage;