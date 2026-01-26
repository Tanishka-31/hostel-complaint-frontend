import { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/complaints/user/${user.id}`
      );
      setComplaints(res.data);
    };

    fetchComplaints();
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <h2>My Complaints</h2>

        {complaints.length === 0 ? (
          <p>No complaints yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} style={{ marginBottom: "10px" }}>
              <p><b>Category:</b> {c.category}</p>
              <p><b>Description:</b> {c.description}</p>
              <p><b>Status:</b> {c.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
