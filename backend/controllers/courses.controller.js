const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const enrollements=require("../dataModel/enrollements.model");
const Tasks=require("../dataModel/tasks")
const Submissions=require("../dataModel/submissions")
const mongoose = require("mongoose");
const { login } = require("./auth.controller");
const tasks = require("../dataModel/tasks");
const students = require("../dataModel/students.model");


// Get all courses
const getCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    return res.status(200).json({
      msg: "Here are all courses",
      count: allCourses.length,
      courses: allCourses
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseid);
    const foundCourse = await Course.findById(courseId);

    if (!foundCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }

    return res.status(200).json({
      msg: "Course found successfully",
      course: foundCourse
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Get instructor's own courses
const myCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const allCourses = await Course.find({ instructorId });

    return res.status(200).json({
      msg: "Here are all your created courses",
      count: allCourses.length,
      courses: allCourses
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getCourseLessons = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId);
    const lessons = await Lesson.find({ courseId }).sort({ position: 1 });
    return res.status(200).json({ lessons });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lessonId = new mongoose.Types.ObjectId(req.params.id);
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });
    return res.status(200).json({ lesson });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getLessonTasks = async (req, res) => {
  try {
    const lessonId = new mongoose.Types.ObjectId(req.params.lessonId);
    const tasks = await Tasks.find({ lessonId }).populate("questions");
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const task = await Tasks.findById(taskId).populate("questions");
    if (!task) return res.status(404).json({ msg: "Task not found" });
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const trackCourseProgress=async(req,res)=>{
  const courseId=new mongoose.Types.ObjectId(req.params.courseId)
  const studentId=req.user.id
  try{
  const lessonsids=await Course.findById(courseId).lessons.find()
  const lessonsWithTask=await Tasks.find({lessonId:lessonsids})
  const student= await students.findById(studentId)
  const studentsSubmittions = await student.populate("taskSubmissions").find({lessonId:lessonsids})
  const numberOfTasks=lessonsWithTask.length   
   return res.status(404).json({msg:"task not found "})
   }
   catch(error){
   return res.status(500).json({msg:error.message})
   }
}

const getTaskquestions=async(req,res)=>{
   let {lessonId}=req.body 
   lessonId=new mongoose.Types.ObjectId(lessonId)
   
try{ 
const task= await Tasks.findOne({lessonId})
const task1=await task.populate("questions");

if(task){
const questions=task1.questions.map((q)=>({
   text:q.text, 
   option1:q.options[0],
   option2:q.options[1],
   option3:q.options[2],
   option4:q.options[3]
}))
return res.status(200).json({
   taskId:task._id,
   "task title":task.title,
   "task discription":task.description,
   data:questions
})
}
 return res.status(404).json({msg:"task not found "}) 

}catch(error){
return res.status(500).json({msg:error.message})
}

}


module.exports = {
  getCourseLessons,
  getLessonById,
  getLessonTasks,
  getTaskById,
  getTaskquestions,
  trackCourseProgress
};