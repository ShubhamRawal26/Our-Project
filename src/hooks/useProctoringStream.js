import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useProctoringStream
 * Custom hook managing camera stream, real-time computer vision / MediaPipe
 * multi-face & face presence detection, motion/secondary device heuristics,
 * tab-switching tracking with background freezing, and audit ledger.
 */
export function useProctoringStream({
  isActive = false,
  onDisqualify,
  onTabSwitch,
  allowDegradedMode = false
} = {}) {
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [cameraDisconnected, setCameraDisconnected] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [rapidMovementDetected, setRapidMovementDetected] = useState(false);

  // Proctoring status: 'ok' | 'degraded' | 'blocked'
  const [proctoringStatus, setProctoringStatus] = useState('blocked');

  // Face detection states
  const [faceAbsent, setFaceAbsent] = useState(false);
  const [faceAbsentCountdown, setFaceAbsentCountdown] = useState(null);
  const [faceCount, setFaceCount] = useState(1);
  const [multipleFacesDetected, setMultipleFacesDetected] = useState(false);

  // Audit violations ledger
  const [proctoringViolations, setProctoringViolations] = useState([]);

  // Internal refs
  const streamRef = useRef(null);
  const videoElementRef = useRef(null);
  const motionCanvasRef = useRef(null);
  const prevFrameDataRef = useRef(null);
  const motionAnimFrameRef = useRef(null);
  const consecutiveViolationsRef = useRef(0);
  const consecutiveMultiFacesRef = useRef(0);
  const hasDisqualifiedRef = useRef(false);

  const faceDetectorRef = useRef(null);
  const mediaPipeDetectorRef = useRef(null);
  const mediaPipeReadyRef = useRef(false);
  const mediaPipeResultRef = useRef({ count: 1, hasFaces: true });

  const faceAbsentStartTimeRef = useRef(null);
  const isTabHiddenRef = useRef(false);
  const tabSwitchCountRef = useRef(0);
  const tabReturnedGraceUntilRef = useRef(0);
  const presenceHistoryRef = useRef([1, 1, 1, 1]);

  // Record a standardized violation
  const recordViolation = useCallback((type, severity, message) => {
    const violation = {
      id: `viol-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      severity, // 'low' | 'medium' | 'high'
      message,
      timestamp: new Date().toISOString()
    };
    setProctoringViolations(prev => [...prev.slice(-49), violation]);
    console.warn(`[Proctoring Violation - ${severity.toUpperCase()}] ${type}: ${message}`);
    return violation;
  }, []);

  // Clean stop of all tracks
  const stopStream = useCallback(() => {
    if (motionAnimFrameRef.current) {
      cancelAnimationFrame(motionAnimFrameRef.current);
      motionAnimFrameRef.current = null;
    }
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.srcObject = null;
    }
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      } catch (err) {
        console.warn('Error stopping media tracks:', err);
      }
      streamRef.current = null;
    }
    setStream(null);
    setCameraActive(false);
    setCameraDisconnected(false);
  }, []);

  // Request camera access
  const requestCamera = useCallback(async () => {
    setIsRequesting(true);
    setCameraError(null);
    hasDisqualifiedRef.current = false;
    consecutiveViolationsRef.current = 0;
    consecutiveMultiFacesRef.current = 0;
    presenceHistoryRef.current = [1, 1, 1, 1];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices API not supported by your browser environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setCameraActive(true);
      setCameraDisconnected(false);
      setProctoringStatus('ok');
      setSessionStartTime(new Date().toISOString());

      // Dedicated headless video element for uninterrupted frame extraction
      if (!videoElementRef.current) {
        const vid = document.createElement('video');
        vid.playsInline = true;
        vid.muted = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        videoElementRef.current = vid;
      }
      videoElementRef.current.srcObject = mediaStream;
      videoElementRef.current.play().catch(() => {});

      // Monitor camera track state (ended / muted)
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          setCameraDisconnected(true);
          setCameraActive(false);
          setProctoringStatus(allowDegradedMode ? 'degraded' : 'blocked');
          recordViolation('CAMERA_LOST', 'high', 'Camera stream disconnected or disabled during active test.');
          if (isActive && !hasDisqualifiedRef.current && onDisqualify && !allowDegradedMode) {
            hasDisqualifiedRef.current = true;
            onDisqualify('Camera stream disconnected or disabled during test.');
          }
        };
        videoTrack.onmute = () => {
          setCameraDisconnected(true);
          setCameraActive(false);
          recordViolation('CAMERA_LOST', 'medium', 'Camera video feed muted by operating system.');
        };
        videoTrack.onunmute = () => {
          setCameraDisconnected(false);
          setCameraActive(true);
        };
      }

      setIsRequesting(false);
      return { success: true, stream: mediaStream };
    } catch (err) {
      console.error('Camera permission failed:', err);
      let message = 'Camera access was blocked or is unavailable.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        message = 'Camera permission was denied. Please allow camera access in browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        message = 'No webcam was detected on this device. Please connect a working camera.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        message = 'Webcam is currently in use by another application or tab.';
      }
      setCameraError(message);
      setCameraActive(false);
      setProctoringStatus(allowDegradedMode ? 'degraded' : 'blocked');
      setIsRequesting(false);
      return { success: false, error: message };
    }
  }, [isActive, onDisqualify, allowDegradedMode, recordViolation]);

  // Enable degraded mode if candidate has no camera or permission issue
  const enableDegradedMode = useCallback(() => {
    setProctoringStatus('degraded');
    recordViolation('DEGRADED_MODE', 'medium', 'Assessment running in unmonitored / degraded proctoring mode.');
  }, [recordViolation]);

  // Tab switch listener - immediate rejection on first tab switch or window blur
  useEffect(() => {
    if (!isActive) return;

    const handleTabSwitchDisqualify = () => {
      if (!hasDisqualifiedRef.current && onDisqualify) {
        hasDisqualifiedRef.current = true;
        tabSwitchCountRef.current += 1;
        setTabSwitchCount(tabSwitchCountRef.current);
        recordViolation('TAB_SWITCH', 'high', 'Test rejected! Window unfocused / tab switch detected.');
        if (onTabSwitch) {
          try {
            onTabSwitch(tabSwitchCountRef.current);
          } catch (e) {
            console.warn('onTabSwitch callback error:', e);
          }
        }
        onDisqualify('Test rejected! Academic assessment policy strictly prohibits switching tabs or unfocusing the test window.');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTabSwitchDisqualify();
      }
    };

    const handleWindowBlur = () => {
      handleTabSwitchDisqualify();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isActive, onDisqualify, onTabSwitch, recordViolation]);

  // Initialize native FaceDetector or MediaPipe FaceDetection if available
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.FaceDetection) {
        const faceDetection = new window.FaceDetection({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
        });
        faceDetection.setOptions({
          model: 'short',
          minDetectionConfidence: 0.45
        });
        faceDetection.onResults((results) => {
          mediaPipeReadyRef.current = true;
          const count = results?.detections?.length || 0;
          mediaPipeResultRef.current = { count, hasFaces: count > 0 };
        });
        mediaPipeDetectorRef.current = faceDetection;
      } else if (typeof window !== 'undefined' && 'FaceDetector' in window) {
        // Native Shape Detection API (Chrome/Chromium fast path)
        // eslint-disable-next-line no-undef
        faceDetectorRef.current = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
      }
    } catch (e) {
      console.warn('[Proctoring] Face detector initialization note:', e);
    }
  }, []);

  // Frame analyzer loop: human presence, multi-face & erratic motion detection
  useEffect(() => {
    if (!isActive || !stream) {
      if (motionAnimFrameRef.current) {
        cancelAnimationFrame(motionAnimFrameRef.current);
        motionAnimFrameRef.current = null;
      }
      faceAbsentStartTimeRef.current = null;
      setFaceAbsent(false);
      setFaceAbsentCountdown(null);
      setMultipleFacesDetected(false);
      setFaceCount(1);
      return;
    }

    if (!motionCanvasRef.current) {
      motionCanvasRef.current = document.createElement('canvas');
      motionCanvasRef.current.width = 80;
      motionCanvasRef.current.height = 60;
    }
    const canvas = motionCanvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let lastCheckTime = performance.now();
    let isDetectingNativeFace = false;

    const analyzeFrame = async () => {
      if (!streamRef.current) return;

      const now = performance.now();
      const dedicatedVideo = videoElementRef.current;
      const pipVideo = document.getElementById('proctor-pip-video');
      const activeVideo = (dedicatedVideo && dedicatedVideo.readyState >= 2)
        ? dedicatedVideo
        : (pipVideo && pipVideo.readyState >= 2 ? pipVideo : dedicatedVideo);

      // Do not process while tab is hidden
      if (isTabHiddenRef.current) {
        motionAnimFrameRef.current = requestAnimationFrame(analyzeFrame);
        return;
      }

      // Sample every ~150ms for responsive tracking
      if (now - lastCheckTime >= 150 && activeVideo && (activeVideo.readyState >= 2 || activeVideo.currentTime > 0)) {
        lastCheckTime = now;
        try {
          ctx.drawImage(activeVideo, 0, 0, 80, 60);
          const currentFrame = ctx.getImageData(0, 0, 80, 60);
          const currentPixels = currentFrame.data;

          // 1. Run detection
          if (mediaPipeDetectorRef.current) {
            mediaPipeDetectorRef.current.send({ image: activeVideo }).catch(() => {});
          }

          // If MediaPipe has warmed up with results, use it; otherwise use native or robust CV detector
          if (mediaPipeReadyRef.current) {
            const res = mediaPipeResultRef.current;
            evaluatePresenceState(res.count, now);
          } else if (faceDetectorRef.current && !isDetectingNativeFace) {
            isDetectingNativeFace = true;
            faceDetectorRef.current.detect(canvas)
              .then(faces => {
                isDetectingNativeFace = false;
                const count = faces ? faces.length : 0;
                // If native detector found faces, evaluate; else verify with robust CV
                if (count > 0) {
                  evaluatePresenceState(count, now);
                } else {
                  const fallback = robustPresenceAndFaceDetection(currentPixels);
                  evaluatePresenceState(fallback.count, now);
                }
              })
              .catch(() => {
                isDetectingNativeFace = false;
                const fallback = robustPresenceAndFaceDetection(currentPixels);
                evaluatePresenceState(fallback.count, now);
              });
          } else {
            const fallback = robustPresenceAndFaceDetection(currentPixels);
            evaluatePresenceState(fallback.count, now);
          }

          // 2. Motion and Device Screen Glare Analysis
          if (prevFrameDataRef.current) {
            let diffScore = 0;
            let brightVarianceCount = 0;
            const totalPixels = 80 * 60;

            for (let i = 0; i < currentPixels.length; i += 4) {
              const rDiff = Math.abs(currentPixels[i] - prevFrameDataRef.current[i]);
              const gDiff = Math.abs(currentPixels[i + 1] - prevFrameDataRef.current[i + 1]);
              const bDiff = Math.abs(currentPixels[i + 2] - prevFrameDataRef.current[i + 2]);
              const avgDiff = (rDiff + gDiff + bDiff) / 3;

              if (avgDiff > 42) diffScore++;

              const luminance = 0.299 * currentPixels[i] + 0.587 * currentPixels[i + 1] + 0.114 * currentPixels[i + 2];
              if (luminance > 238 && avgDiff > 35) brightVarianceCount++;
            }

            const motionRatio = diffScore / totalPixels;
            const screenGlowRatio = brightVarianceCount / totalPixels;

            const isRapidMotion = motionRatio > 0.48;
            const isDeviceGlow = screenGlowRatio > 0.12;

            if (isRapidMotion || isDeviceGlow) {
              consecutiveViolationsRef.current += 1;
              setRapidMovementDetected(true);

              if (consecutiveViolationsRef.current === 4) {
                recordViolation(
                  isDeviceGlow ? 'SECONDARY_DEVICE' : 'ERRATIC_MOTION',
                  'medium',
                  isDeviceGlow ? 'Unauthorized illuminated secondary device detected in frame.' : 'Rapid erratic head/body movement detected.'
                );
              }
            } else {
              setRapidMovementDetected(false);
              consecutiveViolationsRef.current = Math.max(0, consecutiveViolationsRef.current - 1);
            }
          }

          prevFrameDataRef.current = currentPixels;
        } catch (e) {
          // Canvas read error
        }
      }

      motionAnimFrameRef.current = requestAnimationFrame(analyzeFrame);
    };

    /**
     * Inclusive, multi-ethnic human presence, skin chrominance,
     * and facial structure/silhouette detector.
     * Evaluates 80x60 canvas resolution.
     */
    function robustPresenceAndFaceDetection(pixels) {
      let totalLuminance = 0;
      let leftSkinCluster = 0;
      let centerSkinCluster = 0;
      let rightSkinCluster = 0;
      let edgeEnergyCount = 0;

      const totalPixels = 80 * 60;

      // Sample upper-middle region where candidate's head, face & shoulders reside
      for (let y = 4; y < 56; y++) {
        for (let x = 8; x < 72; x++) {
          const idx = (y * 80 + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          const Y  = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLuminance += Y;

          const Cr = 0.5 * r - 0.4187 * g - 0.0813 * b + 128;
          const Cb = -0.1687 * r - 0.3313 * g + 0.5 * b + 128;

          // Multi-ethnic skin chrominance model (Fitzpatrick I - VI)
          // Accommodates warm, neutral, and cool monitor glow
          const isYCbCrSkin = (Cr >= 115 && Cr <= 195) && (Cb >= 65 && Cb <= 160) && (Y >= 20 && Y <= 250);
          
          const maxVal = Math.max(r, g, b);
          const minVal = Math.min(r, g, b);
          const chromaDiff = maxVal - minVal;
          // Red-undertone with tolerance for blue screen reflection
          const isRGBSkin = (r >= 28) && (chromaDiff >= 4) && (r >= g * 0.70) && (r >= b * 0.62);

          const isSkin = isYCbCrSkin && isRGBSkin;

          if (isSkin) {
            if (x < 30) leftSkinCluster++;
            else if (x <= 50) centerSkinCluster++;
            else rightSkinCluster++;
          }

          // Sample local edge gradients (facial features: eyes, brows, nose, lips, hair boundary)
          if (x < 71 && y < 55) {
            const rightIdx = (y * 80 + (x + 1)) * 4;
            const bottomIdx = ((y + 1) * 80 + x) * 4;
            const rightY = 0.299 * pixels[rightIdx] + 0.587 * pixels[rightIdx + 1] + 0.114 * pixels[rightIdx + 2];
            const bottomY = 0.299 * pixels[bottomIdx] + 0.587 * pixels[bottomIdx + 1] + 0.114 * pixels[bottomIdx + 2];
            const grad = Math.abs(Y - rightY) + Math.abs(Y - bottomY);
            if (grad > 18) edgeEnergyCount++;
          }
        }
      }

      const avgLuminance = totalLuminance / totalPixels;
      // If camera is covered or dark room (average luminance < 10), candidate is absent
      if (avgLuminance < 10) {
        return { count: 0, hasFaces: false };
      }

      const totalCandidateSkin = leftSkinCluster + centerSkinCluster + rightSkinCluster;

      // Candidate is present if:
      // (a) Sufficient skin cluster in candidate zone, OR
      // (b) Center skin + facial/hair edge energy (e.g. bearded, spectacles, cool lighting), OR
      // (c) Distinct foreground human silhouette edge contrast
      const hasPersonPresent = totalCandidateSkin >= 12 || (centerSkinCluster >= 6 && edgeEnergyCount >= 16) || edgeEnergyCount >= 30;

      if (!hasPersonPresent) {
        return { count: 0, hasFaces: false };
      }

      // Check for multiple distinct separated individuals
      // Two wide separated clusters on left and right with low center
      const hasSeparatedFaces = (leftSkinCluster >= 45 && rightSkinCluster >= 45 && centerSkinCluster < 15);
      const detectedCount = hasSeparatedFaces ? 2 : 1;

      return { count: detectedCount, hasFaces: true };
    }

    /**
     * Evaluates face state with responsive 3-second dismissal
     */
    function evaluatePresenceState(rawCount, timestamp) {
      // Maintain 3-sample rolling history (~450ms)
      presenceHistoryRef.current.push(rawCount);
      if (presenceHistoryRef.current.length > 3) {
        presenceHistoryRef.current.shift();
      }

      // If at least one recent detection in the window, subject is present!
      const hasRecentPresence = presenceHistoryRef.current.some(c => c > 0);
      const smoothedCount = hasRecentPresence ? Math.max(...presenceHistoryRef.current) : 0;

      setFaceCount(smoothedCount);

      // 1. Multiple faces check (> 1 face)
      if (smoothedCount > 1) {
        consecutiveMultiFacesRef.current += 1;
        setMultipleFacesDetected(true);
        if (consecutiveMultiFacesRef.current === 4) {
          recordViolation('MULTIPLE_FACES', 'high', `Multiple individuals (${smoothedCount} faces) detected in camera frame.`);
        }
      } else {
        consecutiveMultiFacesRef.current = 0;
        setMultipleFacesDetected(false);
      }

      // 2. Face absent check - dismisses test within 3 seconds of disappearing
      if (hasRecentPresence) {
        faceAbsentStartTimeRef.current = null;
        setFaceAbsent(false);
        setFaceAbsentCountdown(null);
      } else {
        if (!faceAbsentStartTimeRef.current) {
          faceAbsentStartTimeRef.current = timestamp;
        }
        const elapsed = timestamp - faceAbsentStartTimeRef.current;
        const remainingSeconds = Math.max(0, Math.ceil((3000 - elapsed) / 1000));
        setFaceAbsent(true);
        setFaceAbsentCountdown(remainingSeconds);

        // Record high severity violation when face disappears
        if (elapsed >= 1000 && remainingSeconds === 2) {
          recordViolation('FACE_ABSENT', 'high', 'Candidate face disappeared from camera viewport.');
        }

        // Auto-dismiss within 3 continuous seconds of disappearing
        if (elapsed >= 3000) {
          if (!hasDisqualifiedRef.current && onDisqualify && proctoringStatus === 'ok') {
            hasDisqualifiedRef.current = true;
            onDisqualify('Test dismissed! Face disappeared from camera view for more than 3 seconds.');
          }
        }
      }
    }

    motionAnimFrameRef.current = requestAnimationFrame(analyzeFrame);

    return () => {
      if (motionAnimFrameRef.current) {
        cancelAnimationFrame(motionAnimFrameRef.current);
        motionAnimFrameRef.current = null;
      }
    };
  }, [isActive, stream, onDisqualify, proctoringStatus, recordViolation]);

  // Clean teardown on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  // Generate standardized proctoring metadata payload
  const getProctoringMetadata = useCallback((disqualifiedReason = null) => {
    return {
      proctoring_metadata: {
        proctoring_status: proctoringStatus,
        camera_verified: Boolean(cameraActive || sessionStartTime),
        tab_switch_count: tabSwitchCount,
        disqualified: Boolean(disqualifiedReason),
        disqualification_reason: disqualifiedReason,
        face_absent: faceAbsent,
        multiple_faces_detected: multipleFacesDetected,
        total_violations_recorded: proctoringViolations.length,
        violations: proctoringViolations,
        session_started_at: sessionStartTime || new Date().toISOString(),
        session_ended_at: new Date().toISOString()
      }
    };
  }, [cameraActive, sessionStartTime, tabSwitchCount, faceAbsent, multipleFacesDetected, proctoringStatus, proctoringViolations]);

  return {
    stream,
    cameraActive,
    cameraError,
    isRequesting,
    tabSwitchCount,
    cameraDisconnected,
    rapidMovementDetected,
    proctoringStatus,
    faceAbsent,
    faceAbsentCountdown,
    faceCount,
    multipleFacesDetected,
    proctoringViolations,
    requestCamera,
    stopStream,
    enableDegradedMode,
    recordViolation,
    getProctoringMetadata
  };
}
