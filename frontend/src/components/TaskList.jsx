import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTasksByUser, updateTask, deleteTask } from "../api/taskApi";
import CreateTask from "./CreateTask";

function TaskList({ userId }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasksByUser(userId);
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const markCompleted = async (task) => {
    await updateTask(task.id, { ...task, status: "COMPLETED" });
    loadTasks();
  };

  const removeTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "30px",
        background: "#f4f4f9",
        minHeight: "100vh",
      }}
    >
      {/* LEFT IMAGE */}
      <div style={{ flex: 1 }}>
        <img
          src="https://img.freepik.com/free-vector/task-management-abstract-concept-illustration_335657-2127.jpg"
          alt="tasks"
          style={{ width: "100%", borderRadius: "12px" }}
        />
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 2 }}>
        <CreateTask userId={userId} onTaskCreated={loadTasks} />

        <h2 style={{ marginBottom: "15px" }}>📋 Your Tasks</h2>

        {tasks.length === 0 && <p>No tasks found</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              }}
            >
              <h4 style={{ color: "#940952" }}>{task.title}</h4>
              <p>{task.description}</p>

              <strong>Status: {task.status}</strong>

              <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                {task.status !== "COMPLETED" && (
                  <button
                    onClick={() => markCompleted(task)}
                    style={greenBtn}
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => removeTask(task.id)}
                  style={redBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const greenBtn = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const redBtn = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TaskList;
