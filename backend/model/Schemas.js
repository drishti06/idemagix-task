import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "instructor" }, // 'admin' or 'instructor'
});

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseName: { type: String },
  date: Date,
});

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String,
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

const User = mongoose.model("User", userSchema);
const Lecture = mongoose.model("Lecture", lectureSchema);
const Course = mongoose.model("Course", courseSchema);

export { User, Lecture, Course };
