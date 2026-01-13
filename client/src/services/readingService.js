// services/readingService.js
export const API_BASE = "http://localhost:3000/reading";

export const fetchReadingArticles = async () => {
  const res = await fetch(`${API_BASE}/articles/today`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
};

export const fetchReadingArticle = async () => {
  const res = await fetch(`${API_BASE}/article/today`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
};

export const fetchReadingExercises = async (articleId) => {
  const res = await fetch(`${API_BASE}/articles/${articleId}/exercises`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
};

export const submitReadingResult = async ({ articleId, answers }) => {
  // articleId: string (MongoDB _id of the article)
  // answers: array of { exerciseId: string, answer: any }

  if (!articleId || !answers || !answers.length) {
    throw new Error("articleId and answers are required");
  }

  const res = await fetch(`http://localhost:3000/reading/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      articleId,
      answers,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || "Failed to submit reading result");
  }

  return res.json();
};


export const fetchReadingHistory = async () => {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
};
