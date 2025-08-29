const { Router } = require("express");
const router = Router();
const { addCourse, addLesson } = require("../controllers/course.controller");
const authMiddleware = require("../middleware/auth"); 

// Add course (instructor only)
router.post("/add-course", authMiddleware, addCourse);

// Add lesson (instructor only)
router.post("/add-lesson", authMiddleware, addLesson);

module.exports = router;
