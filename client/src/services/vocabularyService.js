// services/vocabularyService.js
export const fetchWords = async (query = {}) => {
  const params = new URLSearchParams();
  if (query.word) params.append("word", query.word);
  if (query.type) params.append("type", query.type);
  if (query.date) params.append("date", query.date);
  if (query.page) params.append("page", query.page);
  if (query.limit) params.append("limit", query.limit);

  const res = await fetch(`http://localhost:3000/vocabulary?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch words");
  return res.json(); // { data, total, page, limit }
};

export const addWord = async (word) => {
  const res = await fetch("http://localhost:3000/vocabulary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(word),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to add word");
  }
  return res.json();
};
export const fetchCurrentWord = async () => {
  const res = await fetch("http://localhost:3000/vocabulary/current");
  if (!res.ok) throw new Error("Failed to fetch today's word");
  return res.json(); // returns array of words added today
};

export const fetchHintWord = async () => {
  const res = await fetch("http://localhost:3000/vocabulary/hint");
  if (!res.ok) throw new Error("Failed to fetch hint word");
  return res.json();
};

