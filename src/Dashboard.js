import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./Signup.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const url =
      user.role === "admin"
        ? "http://localhost:5000/api/complaints"
        : `http://localhost:5000/api/complaints/user/${user.id}`;

    const res = await axios.get(url);
    const data = res.data;

    setStats({
      total: data.length,
      pending: data.filter(c => c.status === "Pending").length,
      resolved: data.filter(c => c.status === "Resolved").length,
    });
  };

  const chartData = {
    labels: ["Pending", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [stats.pending, stats.resolved],
        backgroundColor: ["#ff9800", "#4caf50"],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card" style={{ width: "500px" }}>
          <h2>
            {user.role === "admin" ? "Admin Dashboard 👑" : "User Dashboard"}
          </h2>

          <p style={{ marginBottom: "20px", color: "#555" }}>
            Logged in as <b>{user.role.toUpperCase()}</b>
          </p>

          <div className="stat-row">
            <StatBox label="Total" value={stats.total} />
            <StatBox label="Pending" value={stats.pending} />
            <StatBox label="Resolved" value={stats.resolved} />
          </div>

          <div style={{ marginTop: "30px" }}>
            <Bar data={chartData} />
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
