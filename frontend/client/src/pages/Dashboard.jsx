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
    //NAvbar
    <><div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "#333",
  color: "#fff",
  borderRadius: "8px"
}}>
  <h2 style={{ margin: 0 }}>Todo App</h2>
  <button 
    onClick={handleLogout}
    style={{
      background: "#ff4d4d",
      border: "none",
      padding: "6px 12px",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>
</div>



    <div style={{ width: "500px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Dashboard</h2>
      
      <h3>Add Todo</h3>
      <form onSubmit={addTodo} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>

        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>


        <button type="submit">Add</button>
      </form>

      <input type="text" value={search} placeholder="search todos..." onChange={(e) => setSearch(e.target.value)}></input>
     

      <select onChange={(e)=> setFilterCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>
      <button onClick={fetchTodos}>Filter</button>

      <h3>Your Todos</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
  {loading ? (
    <p>Loading...</p>
  ) : todos.length === 0 ? (
    <p>No todos found</p>
  ) : (
    todos.map((todo) => (
      <li
        key={todo._id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
          border: "1px solid #ddd",
          padding: "5px",
          borderRadius: "5px"
        }}
      >      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo._id)}
      />

      <span
      style={{
        flex: 1,
        textDecoration: todo.completed ? "line-through" : "none"
      }}
    >
      {todo.text}{" "}
       <em style={{
          fontSize: "0.8em",
          color:
            todo.priority === "High"
              ? "red"
              : todo.priority === "Medium"
              ? "orange"
              : "green"
        }}>
      ({todo.category}) - {todo.priority}
    </em>
    </span>

      <button
        onClick={() => {
          const newText = prompt("Edit todo:", todo.text);
          if (newText) editTodo(todo._id, newText);
        }}
      >
        Edit
      </button>

      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  ))
)}</ul>
    </div>
  </>);
}

export default Dashboard;