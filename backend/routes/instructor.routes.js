const express = require("express");
const router = express.Router();
const controller = require("../controllers/instuructor.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js"); 
const userAuth=require("../middleware/userAuth.middleware.js")


router.post("/add-course", authMiddleware.authMiddleware,userAuth.instructorAuth ,  controller.addCourse);
router.post("/add-lesson", controller.addLesson);
router.get("/all-courses", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getcourses);
router.get("/my-courses", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.mycourses);

router.post("/add-task",controller.addTask);
router.post("/add-question", controller.addQuestion);
router.get("/:courseid", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getcoursebyid);

//router.get("/:lessonid", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getlessonbyid);
//router.get("/all-lessons", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.getlessonbyid);


module.exports = router;
