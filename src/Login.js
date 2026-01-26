import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(res.data.msg);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Hostel Complaint System</h2>

        <input
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
