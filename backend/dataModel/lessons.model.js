const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  position: {
    type: Number, // order inside course
    default: 0,
  }
});
// prevent duplicate lesson
lessonSchema.index({ course_id: 1, title: 1 }, { unique: true });
module.exports = mongoose.model("lessons", lessonSchema);

