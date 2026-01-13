import { useState } from "react";
import ReadingHistoryCard from "./ReadingHistoryCard";
import ReadingResultPage from "./ReadingResultPage";

const ReadingHistoryList = ({ historyData }) => {
  const [selectedResult, setSelectedResult] = useState(null);

  const handleCardClick = (data) => {
    setSelectedResult(data); // show result page for clicked card
  };

  const handleBack = () => {
    setSelectedResult(null); // go back to history list
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {selectedResult ? (
        <ReadingResultPage result={selectedResult} onBack={handleBack} />
      ) : (
        historyData.map((item, index) => (
          <ReadingHistoryCard
            key={index}
            data={item}
            onClick={() => handleCardClick(item)}
          />
        ))
      )}
    </div>
  );
};

export default ReadingHistoryList;
