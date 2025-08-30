const Course = require("../datamodel/courses.model")
const Lesson = require("../datamodel/lessons.model");
const enrollements=require("../dataModel/enrollements.model");
const mongoose = require("mongoose");

const enrollstudent=async(req,res)=>{
const studentId=req.user.id
let courseid=req.body.courseid
courseid= new mongoose.Types.ObjectId(courseid)
const enrolleduser=await enrollements.findOne({course_id:courseid, student_id:studentId})
const course = await Course.findById(courseid);
try{
if (!course) {
return res.status(404).json({msg: "Course not found"});
}

if(!enrolleduser){
const newenrollment = new enrollements({course_id:courseid, student_id:studentId})
await newenrollment.save()
return res.status(201).json({msg:"user enrolled in course successfully"})
}
return res.status(404).json({msg:"you have already enrolled in the course"})
}
catch(error){
return res.status(500).json(error.message)}

}

module.exports={enrollstudent}