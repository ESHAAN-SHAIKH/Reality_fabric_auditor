import { useEffect, useRef } from "react";
import api from "../lib/api";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error", err));

    const interval = setInterval(captureFrame, 3000);
    return () => clearInterval(interval);
  }, []);

  const captureFrame = async () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);

    const image = canvas.toDataURL("image/jpeg");

    try {
      await api.post("/camera/frame", { image });
    } catch (err) {
      console.error("Frame send failed", err);
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded">
      <h2 className="mb-2 font-semibold">Live Camera</h2>
      <video ref={videoRef} autoPlay muted className="rounded w-full" />
      <canvas ref={canvasRef} hidden />
    </div>
  );
}
