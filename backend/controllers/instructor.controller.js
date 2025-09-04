const { default: mongoose } = require("mongoose");
const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const Tasks=require("../dataModel/tasks")
const questions=require("../dataModel/questions")
// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, description, courseImage, } = req.body;
    const newCourse = new Course({
      title,
      description,
      instructorName:req.user.username,
      instructorId: req.user.id,
      courseImage,
      lessons:[]
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
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    const lastLesson = await Lesson.findOne({ courseId: courseId }).sort({ position: -1 }); 
    const nextPosition = lastLesson ? lastLesson.position + 1 : 1; // default position counter
    const newLesson = new Lesson({
      courseId,
      title,
      content,
      videoUrl,
      position:nextPosition
    });
    course.lessons.push(newLesson._id)
    await course.save();
    await newLesson.save();

    return res.status(201).json({ msg: "Lesson added successfully", lesson: newLesson });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Add a task to a lesson in a course
const addTask = async (req, res) => {
  try {
    let { courseId, lessonId, title, description } = req.body;
    courseId=new mongoose.Types.ObjectId(courseId)
    lessonId=new mongoose.Types.ObjectId(lessonId)
  
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    const lesson = Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found" });
    }

    const newTask= new Tasks({ lessonId,title, description, questions: [] });
    lesson.taskId=newTask._id
    await newTask.save();
    await lesson.save()

    return res.status(201).json({ msg: "Task added successfully", data:newTask });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Add a question to a task
const addQuestion = async (req, res) => {
  try {
    let { taskId, text, options, correctAnswer } = req.body;
     taskId=new mongoose.Types.ObjectId(taskId)
    // const course = await Course.findById(courseId);
    // if (!course) {
    //   return res.status(404).json({ msg: "Course not found" });
    // }

    // const lesson = course.lessons.id(lessonId);
    // if (!lesson) {
    //   return res.status(404).json({ msg: "Lesson not found" });
    // }

    const task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    
    const newquestion= new questions({ taskId,text, options, correctAnswer });
    task.questions.push(newquestion._id)
    await newquestion.save()
    await task.save()

    return res.status(201).json({ msg: "Question added successfully", newquestion });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


module.exports={addLesson,addCourse,addTask,addQuestion}
