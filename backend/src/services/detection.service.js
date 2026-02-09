import { analyzeFrame } from "./gemini.service.js";
import { prisma, io } from "../server.js";

export async function processFrame(streamId, frame, metadata) {
  const aiResult = await analyzeFrame(frame, metadata);

  const detection = await prisma.detectionEvent.create({
    data: {
      streamId,
      anomalyType: aiResult.anomalyType,
      confidence: Math.min(Math.max(aiResult.confidence, 0), 1),
      explanation: aiResult.explanation,
      aiSource: "GEMINI"
    }
  });

  io.to(streamId).emit("detection", detection);
}
