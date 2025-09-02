const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dueDate: Date,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"   // reference Question model
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);
