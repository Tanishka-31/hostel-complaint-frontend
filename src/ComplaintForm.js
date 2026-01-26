import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function ComplaintForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // 👉 user automatically from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    if (!category || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/complaints",
        {
          userId: user.id,
          category,
          description,
        }
      );

      alert(res.data.msg);

      // 👉 complaint submit ke baad my complaints page
      navigate("/my-complaints");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to submit complaint ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Raise a Complaint</h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Water">Water</option>
          <option value="Food">Food</option>
          <option value="Electricity">Electricity</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <button className="main-btn" onClick={handleSubmit}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
}

export default ComplaintForm;
