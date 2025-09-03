const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
});

// Prevent duplicate enrollments (same student in same course)
enrollmentSchema.index({ course_id: 1, student_id: 1 }, { unique: true });

module.exports = mongoose.model("EnrollmentS", enrollmentSchema);

