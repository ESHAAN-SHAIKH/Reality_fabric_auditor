import { useEffect, useRef } from "react";
import { useCamera } from "../hooks/useCamera";
import api from "../lib/api";

export default function CameraFeed() {
  const { videoRef, ready, startCamera } = useCamera();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const interval = setInterval(async () => {
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const frame = canvas.toDataURL("image/jpeg", 0.6);
      await api.post("/camera/frame", { frame });
    }, 1000);

    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="bg-slate-900 rounded p-4">
      {!ready && (
        <button
          onClick={startCamera}
          className="mb-3 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Enable Camera
        </button>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded w-full mb-2"
      />

      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        className="hidden"
      />

      <div className="text-sm text-slate-400">
        Camera: {ready ? "Active" : "Inactive"}
      </div>
    </div>
  );
}
