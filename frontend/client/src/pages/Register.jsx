import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }

  };

  return (
  <div style={styles.container}>

    <div style={styles.card}>
      <h2 style={styles.title}>Create Account ✨</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

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
          Register
        </button>

      </form>

      <p style={styles.text}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>Login</Link>
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
    fontFamily: "Arial",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    color: "white",
    textAlign: "center",
  },
  title: { marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  text: { marginTop: "15px" },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;