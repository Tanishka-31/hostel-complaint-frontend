import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ComplaintForm from "./ComplaintForm";
import MyComplaints from "./MyComplaints";
import AdminDashboard from "./AdminDashboard";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Unified Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Resident pages */}
        <Route
          path="/complaint"
          element={
            <>
              <Navbar />
              <ComplaintForm />
            </>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <>
              <Navbar />
              <MyComplaints />
            </>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <>
              <Navbar />
              <AdminDashboard />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
