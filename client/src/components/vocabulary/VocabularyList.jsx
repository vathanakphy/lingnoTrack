import React, { useState, useEffect } from "react";
import { VocabularyCard } from "./VocabularyCard";
import { AddWordModal } from "./AddWordModal";
import { WordDetailModal } from "./WordDetailModal";
import { fetchWords, fetchCurrentWord, addWord } from "../../services/vocabularyService";

export const VocabularyList = ({ dailyGoal }) => {
  const [words, setWords] = useState([]); // all words
  const [todayWords, setTodayWords] = useState([]); // words added today
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState({
    word: "",
    type: "",
    definition: "",
    example: "",
    image: "",
  });
  const [selectedWord, setSelectedWord] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  // Fetch today's words + all words on mount
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const today = await fetchCurrentWord();
        const todayList = today || [];
        setTodayWords(todayList);

        const all = await fetchWords({ page: 1, limit, word: search });
        const filtered = all.data.filter(
          (w) => !todayList.some((tw) => tw._id === w._id)
        );

        setWords(filtered);
        setTotal(all.total);
        setPage(all.page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [search, limit]);

  // Add new word
  const handleAddWord = async () => {
    if (words.length + todayWords.length >= dailyGoal) {
      alert(`Daily goal of ${dailyGoal} words reached!`);
      return;
    }
    try {
      const added = await addWord(newWord);

      // Refresh today's words if added today
      const createdAt = new Date(added.createdAt);
      const today = new Date();
      if (
        createdAt.getFullYear() === today.getFullYear() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getDate() === today.getDate()
      ) {
        const updatedToday = await fetchCurrentWord();
        setTodayWords(updatedToday || []);
      }

      // Add to "all words" if not duplicate
      if (!words.some((w) => w._id === added._id)) {
        setWords([added, ...words]);
      }

      setNewWord({ word: "", type: "", definition: "", example: "", image: "" });
      setShowAddModal(false);
    } catch (err) {
      alert(err.message || "Failed to add word");
    }
  };

  // Pagination helper
  const loadPage = async (targetPage) => {
    setLoading(true);
    try {
      const res = await fetchWords({ page: targetPage, limit, word: search });
      const filtered = res.data.filter(
        (w) => !todayWords.some((tw) => tw._id === w._id)
      );
      setWords(filtered);
      setPage(res.page);
      setTotal(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-slate-600 dark:text-slate-400">Loading words...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        Progress: {todayWords.length}/{dailyGoal} words added today
      </div>

      {/* Add Word */}
      <button
        onClick={() => setShowAddModal(true)}
        className="self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Add New Word
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Today's Words */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Today's Words</h3>
        {todayWords.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {todayWords.map((w) => (
              <VocabularyCard key={w._id} word={w} onClick={setSelectedWord} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No words today</p>
        )}
      </div>

      {/* All Words */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">All Words</h3>
        {words.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {words.map((w) => (
              <VocabularyCard key={w._id} word={w} onClick={setSelectedWord} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No words found</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => loadPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            onClick={() => loadPage(page + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddWordModal
        show={showAddModal}
        newWord={newWord}
        onWordChange={setNewWord}
        onAdd={handleAddWord}
        onCancel={() => setShowAddModal(false)}
      />
      <WordDetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />
    </div>
  );
};
