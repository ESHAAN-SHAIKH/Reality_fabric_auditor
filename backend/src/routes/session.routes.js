import express from "express";
import { prisma } from "../prisma/client.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { summary, confidence, anomaly } = req.body;

  const session = await prisma.detectionSession.create({
    data: { summary, confidence, anomaly },
  });

  res.json(session);
});

router.get("/", async (_, res) => {
  const sessions = await prisma.detectionSession.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(sessions);
});

export default router;
