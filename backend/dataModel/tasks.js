const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',   // link task to a lesson
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: Date,
  questions: [questionSchema],  // array of questions
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);
module.exports = mongoose.model("Task", taskSchema);
