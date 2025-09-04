const express = require("express");
const router = express.Router();
const controller = require("../controllers/instructor.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js"); 
const userAuth=require("../middleware/userAuth.middleware.js")


router.post("/add-course", authMiddleware.authMiddleware,userAuth.instructorAuth ,  controller.addCourse);
router.post("/add-lesson", controller.addLesson);
router.post("/add-task",controller.addTask);
router.post("/add-question", controller.addQuestion);

//router.get("/:lessonid", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getlessonbyid);
//router.get("/all-lessons", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getlessonbyid);


module.exports = router;
