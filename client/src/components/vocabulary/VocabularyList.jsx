import React, { useState, useEffect } from "react";
import { VocabularyCard } from "./VocabularyCard";
import { AddWordModal } from "./AddWordModal";
import { WordDetailModal } from "./WordDetailModal";
import { fetchWords, fetchCurrentWord, addWord } from "../../services/vocabularyService";

export const VocabularyList = ({ dailyGoal }) => {
  const [words, setWords] = useState([]); // all words for pagination
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

  // Initial load: today's words and all words
  useEffect(() => {
    const init = async () => {
      setLoading(true); // show loading while fetching

      try {
        // 1. Load today's words
        const today = await fetchCurrentWord();
        const todayList = today.length ? today : [];
        setTodayWords(todayList);

        // 2. Load all words
        const all = await fetchWords({ page: 1, limit, word: search });

        // 3. Filter out today’s words before setting state
        const filtered = all.data.filter(
          (w) => !todayList.some((tw) => tw.id === w.id || tw._id === w._id)
        );

        setWords(filtered);
        setTotal(all.total);
        setPage(all.page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // UI renders only after all is ready
      }
    };

    init();
  }, []);// run once on mount

  // Reload words when search or todayWords change
  useEffect(() => {
    const loadFilteredWords = async () => {
      setLoading(true);
      try {
        const res = await fetchWords({ page: 1, limit, word: search });
        const filtered = res.data.filter(
          (w) => !todayWords.some((tw) => tw.id === w.id || tw._id === w._id)
        );
        setWords(filtered);
        setTotal(res.total);
        setPage(res.page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFilteredWords();
  }, [search, todayWords]);

  const handleAddWord = async () => {
    if (words.length + todayWords.length >= dailyGoal) {
      alert(`Daily goal of ${dailyGoal} words reached!`);
      return;
    }

    try {
      const added = await addWord(newWord);

      // If added today, refresh today's words
      const today = new Date();
      const createdAt = new Date(added.createdAt);
      if (
        createdAt.getFullYear() === today.getFullYear() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getDate() === today.getDate()
      ) {
        const updatedToday = await fetchCurrentWord();
        setTodayWords(updatedToday.length ? updatedToday : []);
      }

      setWords([...words, added]);
      setNewWord({
        word: "",
        type: "",
        definition: "",
        example: "",
        image: "",
      });
      setShowAddModal(false);
    } catch (err) {
      alert(err.message || "Failed to add word");
    }
  };

  const handleNextPage = () => {
    if (page * limit < total) {
      const loadNext = async () => {
        setLoading(true);
        try {
          const res = await fetchWords({ page: page + 1, limit, word: search });
          const filtered = res.data.filter(
            (w) => !todayWords.some((tw) => tw.id === w.id || tw._id === w._id)
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
      loadNext();
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const loadPrev = async () => {
        setLoading(true);
        try {
          const res = await fetchWords({ page: page - 1, limit, word: search });
          const filtered = res.data.filter(
            (w) => !todayWords.some((tw) => tw.id === w.id || tw._id === w._id)
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
      loadPrev();
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-slate-600 dark:text-slate-400">
        Loading words...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        Progress: {todayWords.length}/{dailyGoal} words added today
      </div>

      {/* Add Word Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Add New Word
      </button>

      {/* Search */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search words..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Today's Words */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Today's Words</h3>
        {todayWords.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {todayWords.map((w) => (
              <VocabularyCard key={w.id || w._id} word={w} onClick={setSelectedWord} />
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
              <VocabularyCard key={w.id || w._id} word={w} onClick={setSelectedWord} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No words found</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            onClick={handleNextPage}
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
