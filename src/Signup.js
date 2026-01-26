import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [role, setRole] = useState("resident");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { role, name, email, password }
      );
      alert(res.data.msg);
      navigate("/");
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        <div className="role-toggle">
          <button
            className={role === "resident" ? "active" : ""}
            onClick={() => setRole("resident")}
          >
            Resident
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="main-btn" onClick={handleSignup}>
          Signup
        </button>

        <p className="link">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
