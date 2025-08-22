import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "./style.css";

export default function SignUp(){
const [formData, setFormData] = useState({name:"" , email: "", password1: "",  password2: "" });
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
        if(formData.password1!=formData.password2){
            setError("password dont match ")
            return;
        }
        const response = await axios.post("http://localhost:3000/auth/signup",{
            role:"student",
            username:formData.name ,
            email:formData.email,
            password:formData.password2

        },)

        if(response.status === 201 || response.status === 200){
            setError("failed to sign up !")
            console.log("signed up successfully heading to home page!")
            navigate("/Home")
        }

    }catch(error){
        setError("failed to sign up !")
    }
}
;
return(
    <div className="parent" 
    > 
    
    <div className="register">
        <form onSubmit={handelsubmit}>
            <label htmlFor ="name" >Name:</label>
            <input type='text ' name="name" id="name" placeholder=" Name...." value={formData.name || ""} onChange={handleChange} ></input>

                <label htmlFor ="email" >Email:</label>
                  <input type='email' name="email" id="email" placeholder=" Email...." value={formData.email || ""} onChange={handleChange}></input>

                   <label htmlFor ="password" >Password:</label>
                  <input type='password' name="password1" id="password" placeholder=" Password..." value={formData.password1 || ""} onChange={handleChange} ></input>

                   <label htmlFor ="Rpassword" >Repeat Password:</label>
                   {error && <div className="error">{error}</div>}
                  <input type='password' name="password2" id="Rpassword" placeholder=" Repeat Password...." value={formData.password2 || ""} onChange={handleChange} ></input>
                  <div style={{textAlign :'center'}}>
                    <button type="submit">Register</button>
                     </div>
        </form>
    </div>
    </div>
   
)
;}