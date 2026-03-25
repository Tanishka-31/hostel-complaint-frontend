import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Signup.css";
import "./Dashboard.css";

// 🔥 Chart imports
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {

  const storedUser = localStorage.getItem("user");
  const parsed = storedUser ? JSON.parse(storedUser) : null;
  const user = parsed?.user;

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  // 🌤 Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  const fetchStats = useCallback(async () => {
    try {
      if (!user) return;

      const res = await axios.get(
        "https://hostel-complaint-backend-q3ep.onrender.com/api/complaints/user/" + user.id
      );

      const complaints = res.data || [];

      const total = complaints.length;
      const pending = complaints.filter(c => c.status === "Pending").length;
      const resolved = complaints.filter(c => c.status === "Resolved").length;

      setStats({ total, pending, resolved });

    } catch (error) {
      console.log("Dashboard load error", error);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!user) {
    return (
      <div className="dashboard-center">
        <h2>Please login again</h2>
      </div>
    );
  }

  // 📊 Chart Data
  const data = {
    labels: ["Total", "Pending", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [stats.total, stats.pending, stats.resolved],
        backgroundColor: ["#6a11cb", "#ff9800", "#4caf50"],
        borderRadius: 10,
      },
    ],
  };

  // ✅ Chart Options (FIXED POSITION)
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
  };

  return (
    <div className="dashboard-container">

      {/* Greeting */}
      <h3 className="greeting">
        {getGreeting()}, {user?.name || "User"} 👋
      </h3>

      {/* Title */}
      <h2 className="dashboard-title">
        {user.role === "admin"
          ? "Admin Dashboard 👑"
          : "User Dashboard 👤"}
      </h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatBox label="Total Complaints" value={stats.total} color="#6a11cb" />
        <StatBox label="Pending" value={stats.pending} color="#ff9800" />
        <StatBox label="Resolved" value={stats.resolved} color="#4caf50" />
      </div>

      {/* 🔥 Chart */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

    </div>
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