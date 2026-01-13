// api/vocabulary.ts

export interface Vocabulary {
  id?: string;
  word: string;
  type: string;
  definition: string;
  example?: string;
  image?: string;
  createdAt?: string;
}

// Query parameters interface
export interface VocabularyQuery {
  word?: string;
  type?: string;
  date?: string; // YYYY-MM-DD
  page?: number;
  limit?: number;
}

// Fetch vocabulary from backend
export const fetchVocabulary = async (query: VocabularyQuery = {}) => {
  // Build query string
  const params = new URLSearchParams();
  if (query.word) params.append("word", query.word);
  if (query.type) params.append("type", query.type);
  if (query.date) params.append("date", query.date);
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());

  const response = await fetch(`http://localhost:3000/vocabulary?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary");
  }
  return response.json(); // { data, total, page, limit }
};
export const fetchVocabularyById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/vocabulary/${id}`);
  if (!response.ok) {
    throw new Error("Word not found");
  }
  return response.json();
};
export const addVocabulary = async (word: Vocabulary) => {
  const response = await fetch(`http://localhost:3000/vocabulary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(word),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to add word");
  }

  return response.json();
};
