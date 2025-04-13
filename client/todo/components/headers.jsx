import React, { useState } from "react";
import axios from "axios";

export default function Headers({ onNewTodo }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    axios
      .post("http://localhost:3000/todo", { title: task }) // ✅ change task to title
      .then((res) => {
        onNewTodo();
        setTask("");
      })
      .catch((err) => {
        console.error("Error creating todo:", err);
      });
  };

  return (
    <div className="headers">
      <h1>TO-DO LIST</h1>
      <input
        type="text"
        placeholder="Enter to-do"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
