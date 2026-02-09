import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json({ limit: "10mb" }));

app.use("/api", analyzeRoutes);

export default app;
