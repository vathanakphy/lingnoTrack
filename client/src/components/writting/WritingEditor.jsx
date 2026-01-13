import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import { useEffect } from "react";

const WritingEditor = ({ text, setText, onSubmit }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: text || "",
    onUpdate: ({ editor }) => {
      setText(editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-8 py-8 outline-none " +
          "text-[15px] leading-7 " +
          "text-slate-800 dark:text-slate-100 font-[Inter]",
      },
    },
  });

  useEffect(() => {
    if (editor && text !== editor.getText()) {
      editor.commands.setContent(text || "");
    }
  }, [text, editor]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (!editor) return null;

  return (
    <div className="mx-auto bg-white dark:bg-slate-900
      rounded-xl border border-slate-200 dark:border-slate-800">

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2
        border-b border-slate-200 dark:border-slate-800
        text-slate-500 dark:text-slate-400">

        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={<FiBold />}
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<FiItalic />}
        />
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={<FiUnderline />}
        />

        <span className="ml-auto text-xs tracking-wide uppercase">
          Writing mode
        </span>
      </div>

      {/* Editor */}
      <div className="relative">
        {editor.isEmpty && (
          <div className="pointer-events-none absolute top-8 left-8
            text-slate-400 dark:text-slate-500 text-base">
            Start writing… Use clear structure and short paragraphs.
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-8 py-4
        border-t border-slate-200 dark:border-slate-800
        text-sm text-slate-500 dark:text-slate-400">

        <span>{wordCount} words · minimum 50</span>

        <button
          onClick={onSubmit}
          disabled={wordCount < 50}
          className="px-5 py-2 rounded-lg font-medium
            text-white bg-slate-900 dark:bg-slate-100
            dark:text-slate-900
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:opacity-90 transition"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

const ToolbarButton = ({ icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md transition
      ${active
        ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
        : "hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
  >
    {icon}
  </button>
);

export default WritingEditor;
