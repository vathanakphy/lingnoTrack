import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopicHeader from "../components/writting/TopicHeader";
import WritingEditor from "../components/writting/WritingEditor";
import WritingHistoryCards from "../components/writting/WritingHistoryCards";
import WritingHistoryDetail from "../components/writting/WritingHistoryDetail";

import { fetchWritingHistory, submitWriting, getTopic } from "../services/writingService";

const WritingLab = () => {
  const [topic, setTopic] = useState("");          // current writing topic
  const [hint, setHint] = useState("");          // current writing hint
  const [text, setText] = useState("");            // editor text
  const [history, setHistory] = useState([]);      // writing history
  const [selected, setSelected] = useState(null);  // selected entry for detail view
  const [loading, setLoading] = useState(true);    // page loading state
  const [submitting, setSubmitting] = useState(false); // submit button state
  const [feedback, setFeedback] = useState("");    // feedback popup

  // Load initial topic and history
  useEffect(() => {
    const loadData = async () => {
      try {
        const randomTopic = await getTopic(); // returns a string
        const historyData = await fetchWritingHistory();

        setTopic(randomTopic.topic); // set single 
        setHint(randomTopic.hint);   // set hint
        setHistory(historyData);
      } catch (err) {
        console.error("Error loading writing lab data:", err);
        setFeedback("Failed to load writing lab data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Generate a new topic on button click
  const generateTopic = async () => {
    try {
      const randomTopic = await getTopic(); // returns { topic, hint }
      setTopic(randomTopic.topic);
      setHint(randomTopic.hint);
    } catch (err) {
      console.error("Failed to generate topic:", err);
      setFeedback("Failed to generate new topic.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };


  // Handle writing submission
  const handleSubmit = async () => {
    if (!topic) return setFeedback("Please select a topic first.");
    if (!text.trim()) return setFeedback("Please write something before submitting.");

    setSubmitting(true);
    try {
      const entry = await submitWriting(topic, text); // send to backend

      // Show feedback popup
      setFeedback("Writing submitted successfully!");

      // Update history after submission
      setHistory([entry, ...history]);
      setSelected(entry);
      setText(""); // clear editor

      // Hide popup after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback(err.message || "Failed to submit writing");
      setTimeout(() => setFeedback(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-600 dark:text-slate-400">
        Loading writing lab...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-8 max-w-6xl mx-auto">
        {/* Topic selector */}
        <TopicHeader
          topic={topic}
          generateTopic={generateTopic}
          hint={hint}
        />

        {/* Writing editor */}
        <WritingEditor
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          submitting={submitting}
        />

        {/* History Cards */}
        <WritingHistoryCards history={history} onSelect={setSelected} />

        {/* Detail View */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="relative w-full max-w-2xl p-6">
              <WritingHistoryDetail
                item={selected}
                onClose={() => setSelected(null)}
              />
            </div>
          </div>
        )}

        {/* Feedback popup */}
        {feedback && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            {feedback}
          </div>
        )}
      </main>
    </div>
  );
};

export default WritingLab;
