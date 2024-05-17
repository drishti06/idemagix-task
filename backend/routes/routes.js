import express from "express";
import { User, Lecture, Course } from "../model/Schemas.js";
const router = express.Router();

// Route to get all instructors
router.get("/instructors", async (req, res) => {
  const instructors = await User.find({ role: "instructor" });
  res.json(instructors);
});

// Route to add a new course
router.post("/courses", async (req, res) => {
  const { name, level, description, image } = req.body;
  const course = new Course({ name, level, description, image });
  await course.save();
  res.json(course);
});

// Route to add a lecture to a course
router.post("/courses/:courseId/lectures", async (req, res) => {
  const { courseId } = req.params;
  const { instructorId, date } = req.body;

  // Check if the instructor is already booked for the date
  const existingLecture = await Lecture.findOne({ instructorId, date });
  if (existingLecture) {
    return res
      .status(400)
      .json({ message: "Instructor is already booked on this date" });
  }

  const lecture = new Lecture({ courseId, instructorId, date });
  await lecture.save();

  // Add lecture to course
  const course = await Course.findById(courseId);
  course.lectures.push(lecture._id);
  await course.save();

  res.json(lecture);
});

export default router;
