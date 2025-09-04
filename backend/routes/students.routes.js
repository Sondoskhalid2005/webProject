const express = require("express");
const router = express.Router();
const controller= require("../controllers/students.controller");
const authMiddleware = require("../middleware/auth.middleware"); 
const userAuth=require("../middleware/userAuth.middleware")


router.post("/inroll-student/:courseid", authMiddleware.authMiddleware,userAuth.studentAuth, controller.enrollstudent);
router.post("/get-grade", authMiddleware.authMiddleware, userAuth.studentAuth,controller.getStudentGrade);

module.exports = router;