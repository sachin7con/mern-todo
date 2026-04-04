import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";


function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      login(res.data); // save user + token

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login failed");

    }
  };

  return (
  <div style={styles.container}>

    <div style={styles.card}>
      <h2 style={styles.title}>Welcome Back 👋</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

      </form>

      <p style={styles.text}>
        Don't have an account?{" "}
        <Link to="/register" style={styles.link}>Register</Link>
      </p>
    </div>

  </div>
);
  

}
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "white",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "10px",
    marginTop: "15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
