import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/todo'; // Adjust to match your backend URL

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  // Fetch todos on initial load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data.ists);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos.');
      console.error('Error fetching todos:', err);
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      return;
    }
    try {
      const response = await axios.post(API_URL, { task: newTask });
      setTodos([...todos, response.data.toDo]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Failed to add todo.');
      console.error('Error adding todo:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/mark/${id}`);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, checked: response.data.list.checked } : todo
        )
      );
      setError('');
    } catch (err) {
      setError('Failed to update todo status.');
      console.error('Error updating todo status:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.task);
  };

  const handleEditInputChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { newList: editText });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, task: editText } : todo
        )
      );
      setEditingId(null);
      setEditText('');
      setError('');
    } catch (err) {
      setError('Failed to edit todo.');
      console.error('Error editing todo:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.button}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.checked || false}
              onChange={() => handleToggleComplete(todo._id)}
              style={styles.checkbox}
            />
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditInputChange}
                  style={styles.editInput}
                />
                <button onClick={() => handleSaveEdit(todo._id)} style={styles.editButton}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)} style={styles.cancelButton}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
                  {todo.task}
                </span>
                <div style={styles.actions}>
                  <button onClick={() => handleEdit(todo)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(todo._id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  editInput: {
    flexGrow: 1,
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default App;
