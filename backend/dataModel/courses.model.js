const mongoose = require("mongoose");

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
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructors", // references to the instructors collection
    required: true,
  }
});

// Prevent duplicate courses
courseSchema.index({ title: 1,instructor_id: 1 }, { unique: true });
module.exports = mongoose.model("Courses", courseSchema);

