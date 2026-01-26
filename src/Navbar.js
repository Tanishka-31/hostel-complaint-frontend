import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 className="logo">Hostel CMS</h3>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        {user.role === "admin" ? (
          <Link to="/admin">All Complaints</Link>
        ) : (
          <>
            <Link to="/complaint">Raise Complaint</Link>
            <Link to="/my-complaints">My Complaints</Link>
          </>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
