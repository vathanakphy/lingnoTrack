import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ReadingHeader from "../components/reading/ReadingHeader";
import ReadingContent from "../components/reading/ReadingContent";
import ReadingExercise from "../components/reading/ReadingExercise";
import ReadingResultPage from "../components/reading/ReadingResultPage";
import ReadingHistoryList from "../components/reading/ReadingHistoryList";
import {
  fetchReadingArticle,
  fetchReadingExercises,
  fetchReadingHistory,
} from "../services/readingService";

const ReadingLab = () => {
  const [article, setArticle] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch history first
        const historyData = await fetchReadingHistory();
        setHistory(historyData);

        // Then fetch article
        const articleData = await fetchReadingArticle();
        if (!articleData) {
          setError("Article not found (404).");
          return;
        }
        setArticle(articleData);

        // Fetch exercises
        const exercisesData = await fetchReadingExercises(articleData._id);
        setExercises(exercisesData);
      } catch (err) {
        console.error("Failed to load reading data:", err);
        setError("Failed to load article content.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackFromResult = () => {
    setResult(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10 space-y-14">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center text-slate-600 dark:text-slate-400">
              Loading reading lab...
            </div>
          )}

          {/* Article error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center text-red-600 dark:text-red-400 space-y-2">
              <p>{error}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You can still view your reading history or try another article.
              </p>
            </div>
          )}

          {/* Article exists */}
          {!loading && article && exercises && (
            <>
              <ReadingHeader
                type={article.type}
                readTime={article.readTime}
                sourceUrl={article.sourceLink}
              />

              <ReadingContent
                content={article.content}
                wordsMarkdown={article.wordsMarkdown}
              />
              {!result ? (
                <ReadingExercise
                  articleId={article._id}
                  exercises={exercises}
                  onResult={setResult}
                />
              ) : (
                <ReadingResultPage
                  result={result}
                  onBack={handleBackFromResult}
                />
              )}

            </>
          )}

          {/* Reading history with clickable cards */}
          {history && <ReadingHistoryList historyData={history} />}

        </div>
      </main>
    </div>
  );
};

export default ReadingLab;
