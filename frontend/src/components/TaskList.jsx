
function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className="grid grid-cols-[minmax(0,1fr)_100px_90px] items-center gap-3 border-b border-slate-100 py-5 last:border-b-0 sm:grid-cols-[40px_minmax(0,1fr)_130px_120px] sm:gap-4"
        >
          <button
            onClick={() => onToggle(task._id)}
            aria-label={task.completed ? "Undo task" : "Complete task"}
            className={`hidden h-7 w-7 items-center justify-center rounded-full border-2 text-sm sm:flex ${
              task.completed
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-400 text-transparent hover:border-blue-500"
            }`}
          >
            ✓
          </button>

          <span
            className={`min-w-0 break-words text-sm sm:text-base ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </span>

          <button
            onClick={() => onToggle(task._id)}
            className={`h-11 w-full rounded-lg border text-sm font-semibold transition ${
              task.completed
                ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="h-11 w-full rounded-lg border border-red-200 bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
