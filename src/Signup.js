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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://hostel-complaint-backend-q3ep.onrender.com/api/auth/signup",
        { role, name, email, password }
      );

      alert(res.data.msg || "Signup successful 🎉");
      navigate("/");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      alert(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div className="container">

      <form className="card" onSubmit={handleSignup}>

        <h2>Create Account</h2>

        <div className="role-toggle">

          <button
            type="button"
            className={role === "resident" ? "active" : ""}
            onClick={() => setRole("resident")}
          >
            Resident
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>

        </div>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit" className="main-btn">
          Signup
        </button>

        <p className="link">
          Already have account? <Link to="/">Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;