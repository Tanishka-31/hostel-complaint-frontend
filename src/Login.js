import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://hostel-complaint-backend-q3ep.onrender.com/api/auth/login",
        { email, password }
      );

      // ✅ IMPORTANT: Save user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert(res.data.msg);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Hostel Complaint System</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="main-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="link">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;