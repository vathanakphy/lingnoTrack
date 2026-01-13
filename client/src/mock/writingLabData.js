export const writingCardData = {
  title: "The Impact of Social Media",
  description:
    "Discuss how platforms have changed communication. Aim for 300 words.",
  score: {
    score: 85,
    topPercent: 15,
    vocabulary: "B2 Level",
    readability: "Good",
  },
};

export const aiSuggestionsData = [
  {
    type: "spellcheck",
    line: "Line 8",
    issue: "Spelling",
    fix: 'Change "acheive" to "achieve"',
    color: "red",
  },
  {
    type: "vocabulary",
    line: "Line 3",
    issue: "Vocabulary",
    fix: 'Replace "big" with "significant"',
    color: "blue",
  },
  {
    type: "clarity",
    line: "Line 5",
    issue: "Clarity",
    fix: "Split long sentence into two.",
    color: "amber",
  },
];

export const recentTopicsData = [
  {
    date: "Oct 24, 2023",
    topic: "Global Warming Effects",
    wordCount: 245,
    score: "92/100",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    date: "Oct 23, 2023",
    topic: "My Favorite Travel Memory",
    wordCount: 189,
    score: "78/100",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    date: "Oct 21, 2023",
    topic: "Importance of Sleep",
    wordCount: 310,
    score: "88/100",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
];
