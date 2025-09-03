const mongoose = require("mongoose");
const lessons=require("../dataModel/lessons.model")
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructors", // references to the instructors collection
    required: true,
  },
  courseImage: {
    type: String,
  },
  lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "lessons" 
      }],  
});

// Prevent duplicate courses
courseSchema.index({ title: 1,instructor_id: 1 }, { unique: true });
module.exports = mongoose.model("Courses", courseSchema);

