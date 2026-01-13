import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VocabularyPage from "./pages/VocabularyPage";
import WritingLab from "./pages/WritingLab";
import ReadingLab from "./pages/ReadingLab";

function App() {
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
