import { analyzeFrame } from "../services/gemini.service.js";
import { emitDetection } from "../socket.js";

export async function processFrame(req, res) {
  try {
    const { image } = req.body;

    const aiText = await analyzeFrame(image);
    const parsed = JSON.parse(aiText);

    emitDetection({
      status: parsed.anomaly ? "Anomaly Detected" : "Normal",
      confidence: Math.round(parsed.confidence),
      message: parsed.message,
    });

    res.json({ success: true });
  } catch (err) {
    emitDetection({
      status: "Unavailable",
      confidence: 0,
      message: "AI response unavailable",
    });

    res.status(500).json({ error: "AI failure" });
  }
}
