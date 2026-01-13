import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VocabularyPage from "./pages/VocabularyPage";
import WritingLab from "./pages/WritingLab";
import ReadingLab from "./pages/ReadingLab";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/writing";

function App() {
  const [loading, setLoading] = useState(true);
  const [serverUp, setServerUp] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`);
        if (res.ok) {
          setServerUp(true);
        } else {
          setServerUp(false);
        }
      } catch (err) {
        setServerUp(false);
      } finally {
        setLoading(false);
      }
    };

    checkServer();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading… Please wait 1–2 minutes while the server starts.
      </div>
    );
  }

  if (!serverUp) {
    return (
      <div className="text-center mt-20 text-red-600">
        Server is not responding. Please try again later.
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/writing" element={<WritingLab />} />
        <Route path="/reading" element={<ReadingLab />} />
      </Routes>
    </Router>
  );
}

export default App;
