
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000/tasks";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks
  async function getTasks() {
    const res = await fetch(API);
    setTasks(await res.json());
  }

  useEffect(() => {
    getTasks();
  }, []);

  // API requests
  async function addTask(title) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    await getTasks();
  }

  async function editTask(id, title) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    await getTasks();
    setEditingTask(null);
  }

  async function toggleTask(id) {
    await fetch(`${API}/${id}`, { method: "PATCH" });
    await getTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    await getTasks();

    if (editingTask?._id === id) {
      setEditingTask(null);
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Task counts
  const getCount = (value) => {
    if (value === "pending") {
      return tasks.filter((task) => !task.completed).length;
    }

    if (value === "completed") {
      return tasks.filter((task) => task.completed).length;
    }

    return tasks.length;
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <main className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Task Manager
        </h1>

        <TaskForm
          onAdd={addTask}
          editingTask={editingTask}
          onEdit={editTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* Task Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                filter === value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label} ({getCount(value)})
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEditClick={setEditingTask}
        />
      </main>
    </div>
  );
}

export default App;
