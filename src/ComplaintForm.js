import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Signup.css";

function ComplaintForm(){

const [category,setCategory]=useState("");
const [description,setDescription]=useState("");

const stored=JSON.parse(localStorage.getItem("user"));
const user=stored?.user;

const navigate=useNavigate();

const handleSubmit=async()=>{

if(!category || !description){
alert("Fill all fields");
return;
}

await axios.post(
"https://hostel-complaint-backend-q3ep.onrender.com/api/complaints",
{
userId:user.id,
category,
description
}
);

alert("Complaint submitted");

navigate("/my-complaints");

};

return(

<div className="container">
<div className="card">

<h2>Raise Complaint</h2>

<select onChange={(e)=>setCategory(e.target.value)}>
<option value="">Category</option>
<option>Water</option>
<option>Food</option>
<option>Electricity</option>
<option>Cleanliness</option>
</select>

<textarea
placeholder="describe issue"
onChange={(e)=>setDescription(e.target.value)}
/>

<button onClick={handleSubmit}>
Submit Complaint
</button>

</div>
</div>

);

}

export default ComplaintForm;