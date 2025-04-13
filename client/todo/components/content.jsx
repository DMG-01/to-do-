import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Content({ refreshFlag }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get("http://localhost:3000/todo")
      .then((res) => {
        console.log("Backend response:", res.data);
        setTodos(res.data.ists); // ✅ fix here
      })
      .catch((err) => {
        console.log("Failed to fetch todos:", err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, [refreshFlag]);

  if (!Array.isArray(todos)) {
    return <p>Loading or no todos available...</p>;
  }

  return (
    <div className="contents">
      <h2>Your To-Do List:</h2>
      {todos.map((todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
          <input type="checkbox" checked={todo.completed} readOnly />
        </div>
      ))}
    </div>
  );
}
