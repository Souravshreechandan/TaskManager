
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
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // fetch tasks
  async function getTasks() {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();
    setTasks(data);
  }

  // Load tasks when component mounts
  useEffect(() => {
    getTasks().catch(console.error);
  }, []);

  // add task
  async function addTask(title) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to add task");
    }

    await getTasks();
  }

  // edit task
  async function editTask(id, title) {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to edit task");
    }

    await getTasks();
    setEditingTask(null);
  }

  // complete/undo task
  async function toggleTask(id) {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    await getTasks();
  }

  // delete task
  async function deleteTask(id) {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    await getTasks();

    if (editingTask?._id === id) {
      setEditingTask(null);
    }
  }

  // search,filter and sort tasks
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((task) => {
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

  // task counts
  function getCount(value) {
    if (value === "pending") {
      return tasks.filter((task) => !task.completed).length;
    }

    if (value === "completed") {
      return tasks.filter((task) => task.completed).length;
    }

    return tasks.length;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <main className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">

        {/* Heading */}
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Task Manager
        </h1>

        {/* Add and Edit Task */}
        <TaskForm
          onAdd={addTask}
          editingTask={editingTask}
          onEdit={editTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full flex-1 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Task Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
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

        {/* Task List */}
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
