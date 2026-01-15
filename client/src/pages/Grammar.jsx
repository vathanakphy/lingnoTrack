import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
// Static grammar data
const grammarData = [
    {
        "level": "B1-B2 Intermediate",
        "lessons": [
            {
                "title": "Adjectives: gradable and non-gradable",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/adjectives-gradable-non-gradable",
                "learned": false
            },
            {
                "title": "British English and American English",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/british-english-american-english",
                "learned": false
            },
            {
                "title": "Capital letters and apostrophes",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/capital-letters-apostrophes",
                "learned": false
            },
            {
                "title": "Conditionals: third and mixed",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-third-mixed",
                "learned": false
            },
            {
                "title": "Conditionals: zero, first and second",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second",
                "learned": false
            },
            {
                "title": "Contrasting ideas: 'although', 'despite' and others",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/contrasting-ideas-although-despite-others",
                "learned": false
            },
            {
                "title": "Different uses of 'used to'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/different-uses-of-used-to",
                "learned": false
            },
            {
                "title": "Future continuous and future perfect",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-continuous-future-perfect",
                "learned": false
            },
            {
                "title": "Future forms: 'will', 'be going to' and present continuous",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-forms-will-be-going-present-continuous",
                "learned": false
            },
            {
                "title": "Intensifiers: 'so' and 'such'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/intensifiers-so-such",
                "learned": false
            },
            {
                "title": "Modals: deductions about the past",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deductions-about-past",
                "learned": false
            },
            {
                "title": "Modals: deductions about the present",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deductions-about-present",
                "learned": false
            },
            {
                "title": "Modals: permission and obligation",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-permission-obligation",
                "learned": false
            },
            {
                "title": "Modifying comparatives",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modifying-comparatives",
                "learned": false
            },
            {
                "title": "Passives",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/passives",
                "learned": false
            },
            {
                "title": "Past ability",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-ability",
                "learned": false
            },
            {
                "title": "Past habits: 'used to', 'would' and the past simple",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple",
                "learned": false
            },
            {
                "title": "Past perfect",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-perfect",
                "learned": false
            },
            {
                "title": "Phrasal verbs",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/phrasal-verbs",
                "learned": false
            },
            {
                "title": "Present perfect",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/present-perfect",
                "learned": false
            },
            {
                "title": "Present perfect simple and continuous",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/present-perfect-simple-continuous",
                "learned": false
            },
            {
                "title": "Present perfect: 'just', 'yet', 'still' and 'already'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/present-perfect-just-yet-still-already",
                "learned": false
            },
            {
                "title": "Question tags",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/question-tags",
                "learned": false
            },
            {
                "title": "Reflexive pronouns",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reflexive-pronouns",
                "learned": false
            },
            {
                "title": "Relative clauses: defining relative clauses",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/relative-clauses-defining-relative-clauses",
                "learned": false
            },
            {
                "title": "Relative clauses: non-defining relative clauses",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/relative-clauses-non-defining-relative-clauses",
                "learned": false
            },
            {
                "title": "Reported speech: questions",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-questions",
                "learned": false
            },
            {
                "title": "Reported speech: reporting verbs",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-reporting-verbs",
                "learned": false
            },
            {
                "title": "Reported speech: statements",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-statements",
                "learned": false
            },
            {
                "title": "Stative verbs",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/stative-verbs",
                "learned": false
            },
            {
                "title": "The future: degrees of certainty",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-degrees-certainty",
                "learned": false
            },
            {
                "title": "Using 'as' and 'like'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/using-as-like",
                "learned": false
            },
            {
                "title": "Using 'enough'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/using-enough",
                "learned": false
            },
            {
                "title": "Verbs and prepositions",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/verbs-prepositions",
                "learned": false
            },
            {
                "title": "Verbs followed by '-ing' or infinitive to change meaning",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/verbs-followed-ing-or-infinitive-change-meaning",
                "learned": false
            },
            {
                "title": "Wishes: 'wish' and 'if only'",
                "link": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/wishes-wish-if-only",
                "learned": false
            }
        ]
    },
    {
        "level": "C1 Advanced",
        "lessons": [
            {
                "title": "Advanced passives review",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/advanced-passives-review",
                "learned": false
            },
            {
                "title": "Advanced present simple and continuous",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/advanced-present-simple-continuous",
                "learned": false
            },
            {
                "title": "Avoiding repetition in a text",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/avoiding-repetition-text",
                "learned": false
            },
            {
                "title": "Contrasting ideas",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/contrasting-ideas",
                "learned": false
            },
            {
                "title": "Ellipsis",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/ellipsis",
                "learned": false
            },
            {
                "title": "Emphasis: cleft sentences, inversion and auxiliaries",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/emphasis-cleft-sentences-inversion-auxiliaries",
                "learned": false
            },
            {
                "title": "Futures: review",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/futures-review",
                "learned": false
            },
            {
                "title": "Hedging and boosting",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/hedging-and-boosting",
                "learned": false
            },
            {
                "title": "Inversion and conditionals",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/inversion-and-conditionals",
                "learned": false
            },
            {
                "title": "Modals: review",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/modals-review",
                "learned": false
            },
            {
                "title": "Nouns: countable and uncountable",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/nouns-countable-and-uncountable",
                "learned": false
            },
            {
                "title": "Participle clauses",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/participle-clauses",
                "learned": false
            },
            {
                "title": "Past tenses: review",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/past-tenses-review",
                "learned": false
            },
            {
                "title": "Verbs: perfect aspect",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/verbs-perfect-aspect",
                "learned": false
            },
            {
                "title": "Word order in phrasal verbs",
                "link": "https://learnenglish.britishcouncil.org/grammar/c1-grammar/word-order-phrasal-verbs",
                "learned": false
            }
        ]
    },
];

const STORAGE_KEY = "grammarlesson";

const GrammarLab = () => {
    const [levels, setLevels] = useState([]);

    // Load levels from localStorage or fallback to static data
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLevels(parsed);
                    return;
                }
            }
        } catch (err) {
            console.error("Failed to parse localStorage grammar data:", err);
        }

        setLevels(grammarData);
    }, []);

    // Save levels to localStorage whenever they change
    useEffect(() => {
        if (levels.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
        }
    }, [levels]);

    // Toggle learned/unlearned
    const handleMarkLearned = (levelIndex, lessonIndex) => {
        setLevels((prevLevels) => {
            const updated = [...prevLevels];
            updated[levelIndex].lessons[lessonIndex].learned = !updated[levelIndex].lessons[lessonIndex].learned;
            return updated;
        });
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-8 py-10 space-y-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Grammar Lab
                    </h1>
                    {levels.map((level, levelIndex) => (
                        <div key={level.level} className="space-y-4">
                            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                                {level.level}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {level.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lesson.title}
                                        className={`p-4 border rounded-lg flex justify-between items-center
            ${lesson.learned ? "bg-green-100 border-green-400" : "bg-white dark:bg-slate-700 border-gray-300"}`}
                                    >
                                        <a
                                            href={lesson.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-900 dark:text-white font-medium"
                                        >
                                            {lesson.title}
                                        </a>

                                        <button
                                            onClick={() => handleMarkLearned(levelIndex, lessonIndex)}
                                            className={`px-2 py-1 rounded text-sm font-semibold
              ${lesson.learned ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
                                        >
                                            {lesson.learned ? "Unlearn" : "Mark Learned"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </main>
        </div>
    );
};

export default GrammarLab;
