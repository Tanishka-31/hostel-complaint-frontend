import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Signup.css";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  const loadData = useCallback(async () => {
    if (!user) return;

    try {
      const url =
        user.role === "admin"
          ? "https://hostel-complaint-backend-q3ep.onrender.com/api/complaints"
          : `https://hostel-complaint-backend-q3ep.onrender.com/api/complaints/user/${user.id}`;

      const res = await axios.get(url);
      const data = res.data;

      setStats({
        total: data.length,
        pending: data.filter((c) => c.status === "Pending").length,
        resolved: data.filter((c) => c.status === "Resolved").length,
      });
    } catch (err) {
      console.error("Dashboard load error", err);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!user) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h2>User not found. Please login again.</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>
            {user.role === "admin"
              ? "Admin Dashboard 👑"
              : "User Dashboard"}
          </h2>

          <div className="stat-row">
            <StatBox label="Total" value={stats.total} />
            <StatBox label="Pending" value={stats.pending} />
            <StatBox label="Resolved" value={stats.resolved} />
          </div>
        </div>
      </div>
    </>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default Dashboard;