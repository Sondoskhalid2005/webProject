import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./style.css";

export default function Login() {
const [accept, setAccept] = useState(false);
const [formData, setFormData] = useState({role:"",email: "",password:"" });
const [error, setError] = useState(""); 
const navigate = useNavigate();
 
const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
}
const handelsubmit=async(e)=>{ 
    e.preventDefault() //prevent refreshing the page
    setError("");
    try{ 
        const response = await axios.post("http://localhost:3000/auth/login",{
            email:formData.email,
            password:formData.password
        },)

        if(response.status === 200){
            console.log("loged in successfully heading to home page!")
            navigate("/Home")
        }

    }catch(error){
        setError("failed to login !")
    }
};
return (
    <div className="parent">
      <div className="login">
        <form onSubmit={handelsubmit}>
          {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ color: "#cfd8dc", marginBottom: "10px" }}>Select your role:</p>
            <button
              type="button"
              className={`role-button ${formData.role === "Instructor" ? "active" : ""}`}
              onClick={() => setFormData.role("Instructor")}
            >
              Instructor
            </button>
            <button
              type="button"
              className={`role-button ${formData.role === "Student" ? "active" : ""}`}
              onClick={() => setFormData.role("Student")}
            >
              Student
            </button>
          </div> */}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
          />
          {error && <div className="error">{error}</div>}
          {/* {formData.password.length < 8 && accept && (
            <p className="error">Password must be more than 8 characters</p>
          )} */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}