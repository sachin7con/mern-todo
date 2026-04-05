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
      <p style={styles.subtitle}>Start managing your tasks efficiently</p>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Create Account
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
    fontFamily: "Arial, sans-serif",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "35px",
    borderRadius: "12px",
    width: "340px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  text: {
    marginTop: "18px",
    fontSize: "14px",
  },

  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;