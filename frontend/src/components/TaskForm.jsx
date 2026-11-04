
import { useEffect, useState } from "react";

function TaskForm({ onAdd, editingTask, onEdit, onCancelEdit }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(editingTask ? editingTask.title : "");
  }, [editingTask]);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (editingTask) {
      await onEdit(editingTask._id, trimmedTitle);
    } else {
      await onAdd(trimmedTitle);
    }

    setTitle("");
  }

  function handleCancel() {
    setTitle("");
    onCancelEdit();
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
        className="h-14 min-w-0 flex-1 rounded-xl border border-slate-300 px-4 text-base text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="h-14 rounded-xl bg-blue-600 px-7 font-semibold text-white hover:bg-blue-700"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={handleCancel}
          className="h-14 rounded-xl bg-slate-100 px-7 font-semibold text-slate-600 hover:bg-slate-200"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
