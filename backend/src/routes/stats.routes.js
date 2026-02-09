import express from "express";
import { prisma } from "../prisma/client.js";
import { Parser } from "json2csv";

const router = express.Router();

router.get("/export", async (_, res) => {
  const data = await prisma.detectionSession.findMany();
  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("detections.csv");
  res.send(csv);
});

export default router;
