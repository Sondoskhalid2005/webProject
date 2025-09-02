import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "./style.css";

export default function AddLesson(){
  const [formData, setFormData] = useState({title:"",content:"" ,materials:"", video_url: "", video:null});
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

        const response = await axios.post("http://localhost:3000/instructor/add-lesson",
         {
    courseId: "68b26fc0475e1d68d2b4227b",
    title: formData.title,
    content: formData.content,
    videoUrl:formData.video_url
  },{
          headers:{ Authorization :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjI2ZjdiNDc1ZTFkNjhkMmI0MjI2ZSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzU2Nzk1NDA2LCJleHAiOjE3NTY3OTkwMDZ9.rVrMDTpSzrGNGl5fFx6tpGS6PYCDqnnyuqv1QX1WVrc"}
      })

        if(response.status === 201 || response.status === 200){
            console.log("added new lesson for the course successfully !")
            navigate("/Home")
        }

    }catch(error){
        setError("failed to add new lesson !")
    }
}
const handlevideoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      video: file,
      video_url: URL.createObjectURL(file), // preview only
    }));
  }
};
;
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={handelsubmit}>
          {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ color: "#cfd8dc", marginBottom: "10px" }}>Select your role:</p>
            <button
              type="button"
              className={`role-button ${role === "instructor" ? "active" : ""}`}
              onClick={() => setRole("instructor")}
            >
              instructor
            </button>
            <button
              type="button"
              className={`role-button ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
          </div> */}
 <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ color: "#cfd8dc", marginBottom: "10px" }}>Fill Lesson Details:</p>
 </div> 
           <label htmlFor ="title" style= {{textAlign: "center"}} >Lesson Title:</label>
            <input type='text ' name="title" id="name" placeholder=" Name...." value={formData.title || ""} onChange={handleChange} ></input>

          <label htmlFor ="content" >Lesson Content:</label>
                  <input type='text' name="content" id="content" placeholder=" content...." value={formData.content || ""} onChange={handleChange}></input>
          
          <label htmlFor ="pdf" >Lesson Materials:</label>
                  <input type="file" accept=".pdf" name="materials" id="materials" placeholder=" materials...." value={formData.materials || ""} onChange={handleChange}></input>
{/* 
           <label htmlFor ="video_url" >Video URL:</label>
                  <input type="text" accept="video/*" name="video_url" id="video_url" placeholder=" video url..." value={formData.video_url || ""} onChange={handleChange} ></input>
                   */}
                 <label htmlFor ="video" >Uplode Lesson Video:</label>
                  <input type="file" accept="video/*" name="video" id="video" placeholder=" video..." onChange={handlevideoChange} ></input>
                   {/* <Video src={video_url} width={400} height={300} /> */}
                   {error && <div className="error">{error}</div>}
                  <div style={{textAlign :'center'}}>
                    <button type="submit">Add Lesson</button>
          </div>
        </form>
      </div>
    </div>
  );
}