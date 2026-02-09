import express from "express";
import { analyzeImage } from "../controllers/analyze.controller.js";

const router = express.Router();

router.post("/analyze", analyzeImage);

export default router;
