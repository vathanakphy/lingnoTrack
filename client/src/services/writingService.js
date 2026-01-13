const API_BASE = "http://localhost:3000/writing"; // NestJS API

// Fetch all writing history
export const fetchWritingHistory = async () => {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error("Failed to fetch writing history");
  return res.json();
};

// Submit a new writing entry
export const submitWriting = async (topic, text) => {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, text }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to submit writing");
  }

  return res.json();
};

// Fetch available topics
export const getTopic = async () => {
  const res = await fetch(`${API_BASE}/topics`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json(); // returns array of topic strings
};
