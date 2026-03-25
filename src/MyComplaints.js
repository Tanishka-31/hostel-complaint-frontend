import {useEffect,useState} from "react";
import axios from "axios";
import "./Signup.css";

function MyComplaints(){

const [complaints,setComplaints]=useState([]);

const stored=JSON.parse(localStorage.getItem("user"));
const user=stored?.user;

useEffect(()=>{

const fetchComplaints=async()=>{

const res=await axios.get(
"https://hostel-complaint-backend-q3ep.onrender.com/api/complaints/user/"+user.id
);

setComplaints(res.data);

};

if(user) fetchComplaints();

},[user]);

return(

<div className="container">
<div className="card">

<h2>My Complaints</h2>

{complaints.length===0 ? (
<p>No complaints yet</p>
):(
complaints.map(c=>(
<div key={c._id}>
<p>Category: {c.category}</p>
<p>Description: {c.description}</p>
<p>Status: {c.status}</p>
</div>
))
)}

</div>
</div>

);

}

export default MyComplaints;