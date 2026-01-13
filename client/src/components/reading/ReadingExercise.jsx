import { useState } from "react";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import { submitReadingResult } from "../../services/readingService";
import ReadingResultPage from "./ReadingResultPage";

const ReadingExercise = ({ articleId, exercises }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Handle input changes
  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  // Submit all answers
  const handleSubmit = async () => {
    if (!articleId || !exercises || exercises.length === 0) return;

    // Find first unanswered question
    const firstEmptyIndex = exercises.findIndex(
      (_, idx) => answers[idx] === undefined || answers[idx] === ""
    );

    if (firstEmptyIndex !== -1) {
      // Scroll/focus to the unanswered input
      const el = document.getElementById(`exercise-${firstEmptyIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.();
      }
      alert("Please answer all questions before submitting.");
      return;
    }

    // Prepare payload with all answers
    const payload = {
      articleId,
      answers: exercises.map((q, idx) => ({
        exerciseId: q._id,
        answer: answers[idx] ?? "",
      })),
    };

    setLoadingSubmit(true);
    setSubmitted(false); // reset in case of retry
    try {
      const res = await submitReadingResult(payload);
      if (res) {
        setResult(res); // store result
        setSubmitted(true); // mark as submitted
      }
    } catch (err) {
      console.error("Failed to submit reading result:", err);
      alert("Failed to submit reading result. See console.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  // If result exists, render result page
  if (result) {
    return <ReadingResultPage result={result} onBack={handleTryAgain} />;
  }

  return (
    <section className="space-y-8 relative">
      {exercises.map((q, index) => (
        <div
          key={index}
          className="p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <p className="font-semibold mb-4 text-lg text-slate-900 dark:text-white">
            {index + 1}.{" "}
            {(q.type === "true_false" || q.type === "fill_in_the_blank")
              ? q.statement
              : q.question}
          </p>

          {/* Multiple Choice */}
          {q.type === "multiple_choice" &&
            q.options?.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-3 mt-2 p-2 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition"
              >
                <input
                  type="radio"
                  name={index}
                  id={`exercise-${index}`}
                  disabled={submitted || loadingSubmit}
                  checked={answers[index] === opt}
                  onChange={() => handleChange(index, opt)}
                  className="w-5 h-5 text-blue-600 accent-blue-600"
                />
                <span className="text-slate-800 dark:text-slate-200">{opt}</span>
              </label>
            ))}

          {/* True / False */}
          {q.type === "true_false" && (
            <select
              id={`exercise-${index}`}
              disabled={submitted || loadingSubmit}
              value={
                answers[index] === undefined
                  ? ""
                  : answers[index]
                  ? "true"
                  : "false"
              }
              onChange={(e) => handleChange(index, e.target.value === "true")}
              className="mt-2 w-full border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            >
              <option value="">Select True / False</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}

          {/* Fill in the Blank */}
          {q.type === "fill_in_the_blank" && (
            <input
              id={`exercise-${index}`}
              type="text"
              disabled={submitted || loadingSubmit}
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Type your answer..."
              className="mt-2 w-full border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          )}

          {/* Short Answer */}
          {q.type === "short_answer" && (
            <textarea
              id={`exercise-${index}`}
              disabled={submitted || loadingSubmit}
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Write your answer..."
              className="mt-2 w-full border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      <button
        onClick={submitted ? handleTryAgain : handleSubmit}
        disabled={loadingSubmit}
        className={`flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-3xl shadow-lg transform transition 
          ${loadingSubmit ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-105"}`}
      >
        {loadingSubmit ? (
          <>
            <FiLoader size={20} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <FiCheckCircle size={20} />
            {submitted ? "Try Again" : "Submit Answers"}
          </>
        )}
      </button>
    </section>
  );
};

export default ReadingExercise;
  