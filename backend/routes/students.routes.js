const express = require("express");
const router = express.Router();
const controller= require("../controllers/students.controller");
const authMiddleware = require("../middleware/auth.middleware"); 
const userAuth=require("../middleware/userAuth.middleware")


router.post("/inroll-student", authMiddleware.authMiddleware,userAuth.studentAuth, controller.enrollstudent);
router.post("/get-task", authMiddleware.authMiddleware, userAuth.studentAuth, controller.getTaskquestions);
router.post("/get-grade", authMiddleware.authMiddleware, userAuth.studentAuth,controller.getStudentGrade);
router.post("/track-progress/:coursId", authMiddleware.authMiddleware, userAuth.studentAuth, controller.trackCourseProgress);

module.exports = router;