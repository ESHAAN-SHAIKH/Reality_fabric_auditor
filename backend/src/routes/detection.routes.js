import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { ingestFrame } from "../controllers/detection.controller.js";

const router = Router();

router.post("/", authenticate, ingestFrame);

export default router;
