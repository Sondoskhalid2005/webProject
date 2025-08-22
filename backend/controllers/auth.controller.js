const studentbd=require('../dataModel/studentsbd')
const instructordb=require('../dataModel/instructorebd')
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const signup =async(req,res)=>{
    const {role,username,email,password}=req.body
    const newstudent= await studentbd.findOne({email})
    const newinstructor= await instructordb.findOne({email})
    console.log(newstudent, newinstructor);
    
    try{
        if(newstudent==null & newinstructor==null){ 
         const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if(role=="student"){

        const newstudents=new studentbd({username:username,email:email, password:hashedPassword})
        await newstudents.save();
        return res.status(201).send( 
            {
            msg: "student registered successfully!" ,
            "student name": newstudents.username,
            "student email": newstudents.email,
            "student id": newstudents._id,
            })
        }
      else if(role=="instructor"){

      const newinstructor=new instructordb({username:username,email:email, password:hashedPassword})
      await newinstructor.save();
      return res.status(201).send( 
            {
            msg: "instructor registered successfully!" ,
            "teacher name": newinstructor.username,
            "teacher email": newinstructor.email,
            "teacher id": newinstructor._id,
            })
      }
      }
      else{

        return res.status(404).json({msg:"this email is taken please change it"})
      }
    }catch(error){
        return res.status(500).json(error.message)
      }
}

module.exports= {signup};