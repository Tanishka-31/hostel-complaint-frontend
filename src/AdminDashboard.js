import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // 🔥 loading state

  // 🔥 Fetch complaints
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "https://hostel-complaint-backend-q3ep.onrender.com/api/complaints"
        );
        setComplaints(res.data);
      } catch (err) {
        console.log("Error loading complaints", err);
      }
    };

    fetchAll();
  }, []);

  // 🔥 Resolve function
  const handleResolve = async (id) => {
    try {

      setLoadingId(id); // start loading

      await axios.put(
        `https://hostel-complaint-backend-q3ep.onrender.com/api/complaints/${id}`,
        { status: "Resolved" }
      );

      // update UI instantly
      setComplaints(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status: "Resolved" } : c
        )
      );

    } catch (err) {
      console.log("Error updating status", err);
    } finally {
      setLoadingId(null); // stop loading
    }
  };

  return (
    <div className="admin-container">

      <h2 className="admin-title">Admin Dashboard 👑</h2>

      <div className="complaint-grid">

        {complaints.map((c) => (

          <div className="complaint-card" key={c._id}>

            <h3>{c.category}</h3>

            <p><strong>User:</strong> {c.userId?.name}</p>
            <p><strong>Email:</strong> {c.userId?.email}</p>

            <p className="desc">{c.description}</p>

            <span className={`status ${c.status.toLowerCase()}`}>
              {c.status}
            </span>

            {/* 🔥 button only if pending */}
            {c.status === "Pending" && (
              <button
                className="resolve-btn"
                onClick={() => handleResolve(c._id)}
                disabled={loadingId === c._id}
              >
                {loadingId === c._id
                  ? "Updating..."
                  : "Mark Resolved ✅"}
              </button>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;