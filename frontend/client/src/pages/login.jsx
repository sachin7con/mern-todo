import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
       console.log("LOGIN RESPONSE:", res.data);  
      login(res.data); // save user + token

      navigate("/dashboard");

    } catch (err) {
       console.log("LOGIN ERROR:", err);

      alert(err.response?.data?.message || "Login failed");

    }
  };

  return (

    <div style={{ width: "300px", margin: "50px auto" }}>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>

    </div>

  );

}

export default Login;