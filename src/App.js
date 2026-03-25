import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup"; // 🔥 ADD THIS
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import ComplaintForm from "./ComplaintForm";
import MyComplaints from "./MyComplaints";
import Navbar from "./Navbar";

function App() {

  const stored = JSON.parse(localStorage.getItem("user"));
  const user = stored?.user;

  return (
    <Router>

      {user && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />

        {/* 🔥 SIGNUP ROUTE */}
        <Route path="/signup" element={<Signup />} />

        {user?.role === "admin" && (
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        )}

        {user && user?.role !== "admin" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaint" element={<ComplaintForm />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
}

export default App;