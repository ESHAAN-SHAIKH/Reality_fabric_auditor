// src/middleware/audit.js

import fs from "fs";
import path from "path";

const LOG_FOLDER = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_FOLDER, "audit.log");

// ensure logs folder exists
if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER, { recursive: true });
}

export function auditLog(req, res, next) {
  const timestamp = new Date().toISOString();
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const method = req.method;
  const url = req.originalUrl;

  // privacy-safe logging (no body, no images)
  const line = `[AUDIT] ${timestamp} [IP:${ip}] ${method} ${url}\n`;

  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error("Audit log write failed:", err);
  });

  console.log(line.trim());

  next();
}
