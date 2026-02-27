import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Dashboard.css";

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
      <div className="dashboard-center">
        <h2>Please login again</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">
          {user.role === "admin"
            ? "Admin Dashboard 👑"
            : "User Dashboard 👤"}
        </h2>

        <div className="stats-grid">
          <StatBox label="Total Complaints" value={stats.total} color="#6a11cb" />
          <StatBox label="Pending" value={stats.pending} color="#ff9800" />
          <StatBox label="Resolved" value={stats.resolved} color="#4caf50" />
        </div>
      </div>
    </>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `5px solid ${color}` }}>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default Dashboard;