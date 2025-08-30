const express = require("express");
const router = express.Router();
const controller = require("../controllers/instuructor.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js"); 
const userAuth=require("../middleware/userAuth.middleware.js")

// Add course (instructor only)
router.post("/add-course", authMiddleware.authMiddleware,userAuth.instructorAuth ,  controller.addCourse);

// Add lesson (instructor only)
router.post("/add-lesson", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.addLesson);

module.exports = router;
