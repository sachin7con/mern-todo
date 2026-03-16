import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Others");

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/todos", { text, catagory: category });
      setTodos([...todos, res.data.data]); // backend returns {status, data}
      setText("");
      setCategory("Others");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const res = await API.patch(`/todos/${id}/toggle`);
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>

      <h3>Add Todo</h3>
      <form onSubmit={addTodo} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <h3>Your Todos</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", border: "1px solid #ddd", padding: "5px", borderRadius: "5px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo._id)}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text} <em style={{ fontSize: "0.8em", color: "#555" }}>({todo.catagory})</em>
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;