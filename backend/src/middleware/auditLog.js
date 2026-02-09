// src/middleware/auditLog.js

export function auditLog(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;

  console.log(`[AUDIT] ${timestamp} ${method} ${path}`);

  next();
}
