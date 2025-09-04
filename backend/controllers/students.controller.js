const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const enrollements=require("../dataModel/enrollements.model");
const Tasks=require("../dataModel/tasks")
const Submissions=require("../dataModel/submissions")
const mongoose = require("mongoose");
const { login } = require("./auth.controller");
const tasks = require("../dataModel/tasks");
const students = require("../dataModel/students.model");


const enrollstudent=async(req,res)=>{
const studentId=req.user.id
let courseid=req.params.courseid
courseid= new mongoose.Types.ObjectId(courseid)
console.log(courseid,studentId);

try{
const course = await Course.findById(courseid);
if (!course) {
return res.status(404).json({msg: "Course not found"});
}
const enrolleduser=await enrollements.findOne({courseId:courseid, studentId:studentId})

if(!enrolleduser){
const newenrollment = new enrollements({courseId:courseid, studentId:studentId})
await newenrollment.save()
return res.status(201).json({msg:"user enrolled in course successfully"})
}
return res.status(400).json({msg:"you have already enrolled in the course"})
}
catch(error){
return res.status(500).json(error.message)}

}

const getStudentGrade=async(req,res)=>{
   let taskId=req.body.taskId // or take lesson id
   const studentAnswers=req.body.answers
   taskId= new mongoose.Types.ObjectId(taskId)
   const studentId=req.user.id
   try{
   const task= await Tasks.findById(taskId).populate("questions") // get task questions info directly (rather than getting  ids)
   if(task){

  let score = 0;
  task.questions.forEach((question, i) => {
  if (String(question.correctAnswer).toLocaleLowerCase().trim() === String(studentAnswers[i]).toLocaleLowerCase().trim()) score++;});
console.log(task.questions);

  const newSubmittion = new Submissions({
   taskId,
   studentId,
   grade:score
}) 

   await newSubmittion.save()
   return res.status(200).json({msg:"tasked solved successfully ",
      "task id": task._id,
      "student id":studentId,
      grade:newSubmittion.grade})
  }
   return res.status(404).json({msg:"task not found "})
   }catch(error){
   return res.status(500).json({msg:error.message})
   }
}



const getStudentEnrollments = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.params.id);
    const enrolls = await enrollements.find({ studentId }).populate("courseId");
    return res.status(200).json({ enrollments: enrolls });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports={enrollstudent, getStudentGrade}