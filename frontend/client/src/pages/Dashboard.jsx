import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Others");
  const [priority, setPriority] = useState("Low");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const fetchTodos = async () => {
  try {
    setLoading(true);

    const res = await API.get("/todos", {
      params: {
        search,
        category: filterCategory
      }
    });

    setTodos(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTodos();
  }, [search, filterCategory]);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/todos", { text, category, priority });
      setTodos([...todos, res.data.data]); // backend returns {status, data}
      setText("");
      setCategory("Others");
      setPriority("Low");
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  };

  const editTodo = async (id, newText) => {
    try{
      const res =  await API.put(`/todos/${id}`, { text: newText });
      setTodos(todos.map((todo) => todo._id === id ? res.data : todo ));
    }
    catch(err){
      console.log(err);
    }
  }

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
  <div style={styles.container}>

    {/* Navbar */}
    <div style={styles.navbar}>
      <h2>TaskFlow Dashboard</h2>
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div style={styles.content}>

      {/* Add Todo */}
      <div style={styles.card}>
        <h3>Add New Task</h3>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={styles.input}
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.select}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>

          <button type="submit" style={styles.addBtn}>Add</button>
        </form>
      </div>

      {/* Filters */}
      <div style={styles.card}>
        <h3>Search & Filter</h3>

        <input
          type="text"
          value={search}
          placeholder="Search todos..."
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <select onChange={(e) => setFilterCategory(e.target.value)} style={styles.select}>
            <option value="">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>

          <button onClick={fetchTodos} style={styles.filterBtn}>Filter</button>
        </div>
      </div>

      {/* Todo List */}
      <div style={styles.card}>
        <h3>Your Tasks</h3>

        {loading ? (
          <p>Loading...</p>
        ) : todos.length === 0 ? (
          <p>No tasks found 😴</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} style={styles.todoCard}>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo._id)}
              />

              <div style={{ flex: 1 }}>
                <span style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  fontWeight: "500"
                }}>
                  {todo.text}
                </span>

                <div style={{ fontSize: "12px", color: "#666" }}>
                  {todo.category} •{" "}
                  <span style={{
                    color:
                      todo.priority === "High"
                        ? "red"
                        : todo.priority === "Medium"
                        ? "orange"
                        : "green"
                  }}>
                    {todo.priority}
                  </span>
                </div>
              </div>

              <button
                style={styles.editBtn}
                onClick={() => {
                  const newText = prompt("Edit todo:", todo.text);
                  if (newText) editTodo(todo._id, newText);
                }}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  </div>
);
}
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#0f172a",
    color: "white",
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 12px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  content: {
    maxWidth: "800px",
    margin: "30px auto",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    flex: 1,
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  select: {
    padding: "10px",
    borderRadius: "5px",
  },

  addBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  filterBtn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  todoCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  editBtn: {
    background: "#f59e0b",
    border: "none",
    padding: "5px 10px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "5px 10px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default Dashboard;