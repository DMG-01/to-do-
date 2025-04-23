import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(baseURL);
      setTodos(res.data.ists);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task before submitting.");
      return;
    }

    try {
      if (editId) {
        await axios.patch(`${baseURL}/${editId}`, { newList: task });
        setEditId(null);
      } else {
        await axios.post(baseURL, { task });
      }
      setTask("");
      fetchTodos();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const toggleCheck = async (id) => {
    try {
      await axios.patch(`${baseURL}/mark/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleEdit = (todo) => {
    setTask(todo.toDo || todo.task);
    setEditId(todo._id);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          style={{ padding: 10, width: "80%" }}
        />
        <button type="submit" style={{ padding: 10 }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              marginBottom: 10,
              padding: 10,
              background: "#f1f1f1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                textDecoration: todo.checked ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleCheck(todo._id)}
            >
              {todo.toDo || todo.task}
            </span>
            <div>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
