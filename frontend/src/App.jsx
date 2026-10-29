
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    const res = await fetch(API);
    setTasks(await res.json());
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function addTask(title) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    getTasks();
  }

  async function toggleTask(id) {
    await fetch(`${API}/${id}`, { method: "PATCH" });
    getTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getTasks();
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <main className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Task Manager
        </h1>

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
