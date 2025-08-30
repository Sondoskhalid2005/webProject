const express = require("express");
const router = express.Router();
const controller= require("../controllers/students.controller");
const authMiddleware = require("../middleware/auth.middleware"); 
const userAuth=require("../middleware/userAuth.middleware")

// inroll student (studet only)
router.post("/inroll-student", authMiddleware.authMiddleware,userAuth.studentAuth, controller.enrollstudent);


module.exports = router;