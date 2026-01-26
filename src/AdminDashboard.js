import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Signup.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );
      setComplaints(res.data);
    } catch (err) {
      alert("Failed to load complaints ❌");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status }
      );
      fetchComplaints(); // refresh list
    } catch (err) {
      alert("Failed to update status ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card" style={{ width: "90%" }}>
          <h2>Admin Dashboard</h2>

          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <table style={{ width: "100%", marginTop: "15px" }}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.category}</td>
                    <td>{c.description}</td>
                    <td>{c.status}</td>
                    <td>
                      {c.status === "Pending" && (
                        <button
                          onClick={() =>
                            updateStatus(c._id, "Resolved")
                          }
                        >
                          Mark Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
