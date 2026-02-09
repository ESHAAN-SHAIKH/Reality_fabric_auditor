// src/api/api.js
const API_BASE = "/api"; // adjust if your API is at / or another host

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status} ${res.statusText}: ${txt}`);
    err.status = res.status;
    throw err;
  }

  // if server returns a blob (for CSV)
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/octet-stream") || contentType.includes("text/csv")) {
    return res.blob();
  }

  const json = await res.json().catch(() => null);
  return json;
}

export default {
  getStats: () => request("/stats"),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  download: (path) =>
    request(path, {
      method: "GET",
    }),
};
