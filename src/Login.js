import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://hostel-complaint-backend-q3ep.onrender.com/api/auth/login",
        { email, password }
      );

      // Save full user object
      localStorage.setItem("user", JSON.stringify(res.data));

      alert(res.data.msg);

      // Role based redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card login-card">
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

        <button
          className="main-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="link">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;