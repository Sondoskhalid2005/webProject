const Course = require("../models/course");
const Lesson = require("../models/lesson");

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Only instructors can add courses
    if (req.user.role !== "instructor") {
      return res.status(403).json({ msg: "Only instructors can add courses" });
    }

    const newCourse = new Course({
      title,
      description,
      instructorId: req.user.id 
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
    const { courseId, title, content, videoUrl, position } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Only instructor who owns the course can add lessons
    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "You are not the instructor of this course" });
    }

    const newLesson = new Lesson({
      courseId,
      title,
      content,
      videoUrl,
      position
    });

    await newLesson.save();
    return res.status(201).json({ msg: "Lesson added successfully", lesson: newLesson });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.export
