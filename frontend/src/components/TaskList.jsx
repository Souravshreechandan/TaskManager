
function TaskList({ tasks, onToggle, onDelete, onEditClick }) {
  if (tasks.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-400">
        No tasks found.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center gap-3 py-5"
        >
          <span
            className={`min-w-0 flex-1 break-words text-sm sm:text-base ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </span>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => onEditClick(task)}
              className="h-10 rounded-lg bg-slate-100 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onToggle(task._id)}
              className={`h-10 rounded-lg px-3 text-xs font-semibold ${
                task.completed
                  ? "bg-blue-50 text-blue-600"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              type="button"
              onClick={() => onDelete(task._id)}
              className="h-10 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
