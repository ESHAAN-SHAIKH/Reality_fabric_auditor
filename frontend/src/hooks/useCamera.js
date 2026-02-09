import { useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [ready, setReady] = useState(false);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setReady(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera permission denied");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setReady(false);
  }

  return { videoRef, ready, startCamera, stopCamera };
}
