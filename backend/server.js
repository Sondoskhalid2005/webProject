require('dotenv').config()
const express = require("express")
const mongodb=require('mongoose')
const cors=require("cors")
const app = express()
const authrouter=require('../backend/routes/auth.routes')
const instructorRouter=require('./routes/instructor.routes')
const studentsRouter=require('./routes/students.routes')

app.use(express.json())
app.use(cors()) // to connect back with front
console.log(process.env.PORT)

mongodb.connect(process.env.URL)
    .then(()=>{
     app.listen(process.env.PORT, ()=>{
    console.log("connected to the server successfuly")}) 
        })
    .catch((error)=>{console.log("error connecting to database!")})
    

app.use("/auth",authrouter)
app.use("/courses",instructorRouter)
app.use("/student",studentsRouter)

