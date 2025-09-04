const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userAuth = require("../middleware/userAuth.middleware");

// Get all lessons of a course
router.get(
  "/:courseId/lessons",
  authMiddleware.authMiddleware,
  controller.getCourseLessons
);

// Get single lesson by ID
router.get(
  "/lesson/:id",
  authMiddleware.authMiddleware,
  controller.getLessonById
);

// Get tasks of a lesson
router.get(
  "/lesson/:lessonId/tasks",
  authMiddleware.authMiddleware,
  controller.getLessonTasks
);

// Get single task by ID
router.get(
  "/task/:id",
  authMiddleware.authMiddleware,
  controller.getTaskById
);

// Get task questions by lessonId
router.post(
  "/task-questions",
  authMiddleware.authMiddleware,
  userAuth.studentAuth,
  controller.getTaskquestions
);

// Track progress for a course
router.get(
  "/:courseId/progress",
  authMiddleware.authMiddleware,
  userAuth.studentAuth,
  controller.trackCourseProgress
);

module.exports = router;
