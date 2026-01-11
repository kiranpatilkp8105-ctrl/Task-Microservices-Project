import { useState } from "react";
import { createTask } from "../api/taskApi";
import toast from "react-hot-toast";

function CreateTask({ userId, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createTask({
        title,
        description,
        status: "PENDING",
        userId,
      });

      toast.success("Task created ✅");
      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch {
      toast.error("Task create failed ❌");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ color: "#940952", marginBottom: "15px" }}>
        ➕ Create Task
      </h3>

      <input
        style={inputStyle}
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{ ...inputStyle, height: "80px" }}
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleCreate}
        style={{
          background: "#940952",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

export default CreateTask;
