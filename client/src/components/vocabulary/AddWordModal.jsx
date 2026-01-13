import React from "react";

export const AddWordModal = ({ show, newWord, onWordChange, onAdd, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1A2632] p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Add New Word</h2>
        {["word", "type", "definition", "example"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newWord[field]}
            onChange={(e) => onWordChange({ ...newWord, [field]: e.target.value })}
            className="w-full px-3 py-2 mb-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        ))}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700">
            Cancel
          </button>
          <button onClick={onAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
