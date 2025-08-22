require('dotenv').config()
const express = require("express")
const mongodb=require('mongoose')
const cors=require("cors")
const app = express()
const router=require('../backend/routes/auth.routes')

app.use(express.json())
app.use(cors())
console.log(process.env.PORT)

mongodb.connect(process.env.URL)
    .then(()=>{
     app.listen(process.env.PORT, ()=>{
    console.log("connected to the server successfuly")}) 
        })
    .catch((error)=>{console.log("error connecting to database!")})
    
app.use("/auth",router)
    


