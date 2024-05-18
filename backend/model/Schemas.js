import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "instructor", required: true }, // 'admin' or 'instructor'
});

const lectureSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: { type: String, required: true },
  date: { type: Date, required: true },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

const User = mongoose.model("User", userSchema);
const Lecture = mongoose.model("Lecture", lectureSchema);
const Course = mongoose.model("Course", courseSchema);

export { User, Lecture, Course };
