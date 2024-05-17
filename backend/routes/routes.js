import express from "express";
import { User, Lecture, Course } from "../model/Schemas.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  if (password !== user.password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json(user);
});

router.get("/instructors", async (req, res) => {
  const instructors = await User.find({ role: "instructor" });
  res.json(instructors);
});

router.post("/instructors", async (req, res) => {
  const { name, email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists with this email id." });
  }

  const user = new User({
    name,
    email,
    role: "instructor",
    password: "123456",
  });
  await user.save();
  res.json(user);
});
router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.post("/courses", async (req, res) => {
  const { name, level, description, image } = req.body;
  const course = new Course({ name, level, description, image });
  await course.save();
  res.json(course);
});

router.post("/courses/:courseId/lectures", async (req, res) => {
  const { courseId } = req.params;
  const { instructorId, date, courseName } = req.body;
  const existingLecture = await Lecture.findOne({ instructorId, date });
  if (existingLecture) {
    return res
      .status(400)
      .json({ message: "Instructor is already booked on this date" });
  }

  const lecture = new Lecture({ courseId, instructorId, date, courseName });
  await lecture.save();
  const course = await Course.findById(courseId);
  course.lectures.push(lecture._id);
  await course.save();

  res.json(lecture);
});

router.get("/instructors/:id/lectures", async (req, res) => {
  const { id } = req.params;
  const lecturesById = await Lecture.find({ instructorId: id });
  return res.status(200).json(lecturesById);
});
export default router;
