
import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    await onAdd(title.trim());
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-7 flex flex-col gap-3 border-b border-slate-100 pb-7 sm:flex-row"
    >
      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-14 min-w-0 flex-1 rounded-xl border border-slate-300 px-4 text-base text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="h-14 shrink-0 rounded-xl bg-blue-600 px-7 font-semibold text-white transition hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
