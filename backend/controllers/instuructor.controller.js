const { default: mongoose } = require("mongoose");
const Course = require("../datamodel/courses.model")
const Lesson = require("../datamodel/lessons.model");

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    // // Only instructors can add courses
    // if (req.user.role !== "instructor") {
    //   return res.status(403).json({ msg: "Only instructors can add courses" });
    // }
    const newCourse = new Course({
      title,
      description,
      instructor_id: req.user.id 
    });

    await newCourse.save();
    return res.status(201).json({ msg: "Course created successfully", course: newCourse });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Add a lesson to a course
const addLesson = async (req, res) => {
  try {
    let { courseId, title, content, videoUrl } = req.body;
    courseId= new mongoose.Types.ObjectId(courseId)
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // // Only instructor who owns the course can add lessons
    // if (course.instructorId.toString() !== req.user.id) {
    //   return res.status(403).json({ msg: "You are not the instructor of this course" });
    // }

    const lastLesson = await Lesson.findOne({ course_id: courseId }).sort({ position: -1 }); 
    const nextPosition = lastLesson ? lastLesson.position + 1 : 1; // default position counter
    const newLesson = new Lesson({
      course_id:courseId,
      title,
      content,
      videoUrl,
      position:nextPosition
    });

    await newLesson.save();
    return res.status(201).json({ msg: "Lesson added successfully", lesson: newLesson });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getcourses = async (req, res) => {
  try{
    const allcourses=await Course.find()
  return res.status(200).json({msg:"here is all courses",data:allcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }   
};
const getcoursebyid = async (req, res) => {
  try{
    const courseid= new mongoose.Types.ObjectId(req.params.courseid)
    const foundcourses=await Course.findById(courseid)
  return res.status(200).json({msg:"successfull",data:foundcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }  
};
const mycourses=async (req, res) => {
   const allcourses=await Course.find({instructor_id: req.user.id})
  try{
  return res.status(200).json({msg:"here is all your created courses",data:allcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }  
};
module.exports={addLesson,addCourse,getcourses,getcoursebyid,mycourses}
