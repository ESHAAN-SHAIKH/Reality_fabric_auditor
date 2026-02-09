import express from "express";
import { analyzeFrame } from "../services/gemini.service.js";
import { emitDetection } from "../socket.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { frame } = req.body;

  if (!frame) {
    return res.status(400).json({ error: "Frame missing" });
  }

  const analysis = await analyzeFrame(frame);

  emitDetection({
    status: "live",
    ...analysis,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true });
});

export default router;
