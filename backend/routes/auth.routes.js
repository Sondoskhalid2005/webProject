const express=require("express")
const router=express.Router()
const authcontroller=require('../controllers/auth.controller')
const  authMiddleware=require("../middleware/auth.middleware")
router.post("/signup", authcontroller.signup)

router.post("/login", authcontroller.login);

router.get("/logout",authcontroller.logout);

module.exports=router
