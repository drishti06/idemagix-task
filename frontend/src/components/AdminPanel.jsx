// src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [newLecture, setNewLecture] = useState({
    courseId: "",
    courseName: "",
    instructorId: "",
    date: "",
  });

  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      axios
        .get(`${import.meta.env.VITE_BASEURL}/api/instructors`)
        .then((res) => setInstructors(res.data));

      axios
        .get(`${import.meta.env.VITE_BASEURL}/api/courses`)
        .then((res) => setCourses(res.data));
    } else {
      navigate("/");
    }
  }, [load]);

  const handleAddCourse = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASEURL}/api/courses`, newCourse)
      .then((res) => {
        setCourses([...courses, res.data]);
        setNewCourse({ name: "", level: "", description: "", image: "" });
      });
  };

  const handleAddLecture = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/courses/${
          newLecture.courseId
        }/lectures`,
        newLecture
      )
      .then((res) => {
        setLoad(true);
        setNewLecture({
          courseId: "",
          courseName: "",
          instructorId: "",
          date: "",
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleAddInstructor = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASEURL}/api/instructors`, newInstructor)
      .then((res) => {
        setLoad(true);
        setInstructors([...instructors, res.data]);
        setNewInstructor({ name: "", email: "" });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <div className="flex min-h-[89dvh]">
        <div className="sidebar border flex gap-3 text-xl flex-col w-1/6">
          <span className="cursor-pointer  px-3 py-2 w-full">Link1</span>
          <span className="cursor-pointer px-3 pb-2">Link2</span>
        </div>
        <div className="w-5/6 border px-4 py-2 flex flex-col gap-7">
          <h1 className="text-2xl font-medium pb-2">Admin Panel</h1>
          <div className="border p-2 rounded-sm flex flex-col gap-3">
            <h2>Add Instructor</h2>
            <div className="flex flex-wrap gap-5">
              <div className=" flex items-center gap-2 ">
                <label htmlFor="name">Name</label>
                <input
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  placeholder="Name"
                  value={newInstructor.name}
                  onChange={(e) =>
                    setNewInstructor({ ...newInstructor, name: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  type="email"
                  placeholder="Email"
                  value={newInstructor.email}
                  onChange={(e) =>
                    setNewInstructor({
                      ...newInstructor,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="px-2 py-1 bg-black rounded-md"
                onClick={handleAddInstructor}
              >
                Add Instructor
              </button>
            </div>
          </div>
          <div className="border rounded-sm flex flex-col gap-2 p-2">
            <h2>Add Course</h2>
            <div className="flex  flex-wrap gap-5">
              <div className=" flex items-center gap-2 ">
                <label htmlFor="name">Name</label>
                <input
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
              </div>
              <div className=" flex items-center gap-2 ">
                <label htmlFor="level">Level</label>
                <select
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, level: e.target.value })
                  }
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className=" flex items-center gap-2 ">
                <label htmlFor="description">Description</label>
                <input
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              <div className=" flex items-center gap-2 ">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  placeholder="Image URL"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, image: e.target.value })
                  }
                />
              </div>
              <button
                className="px-2 py-1 bg-black rounded-md"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            </div>
          </div>
          <div className="border   rounded-sm flex flex-col gap-2 p-2">
            <h2>Assign Lecture</h2>
            <div className="flex flex-wrap gap-5">
              <div className=" flex items-center gap-2 ">
                <label htmlFor="courseName">Course</label>
                <select
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  onChange={(e) =>
                    setNewLecture({
                      ...newLecture,
                      courseId: e.target.value,
                      courseName: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option className="  " key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex items-center gap-2 ">
                <label htmlFor="instructor">Instructor</label>
                <select
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  onChange={(e) =>
                    setNewLecture({
                      ...newLecture,
                      instructorId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option
                      className=" "
                      key={instructor._id}
                      value={instructor._id}
                    >
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex items-center gap-2 ">
                <label htmlFor="date">Date</label>
                <input
                  className="border border-gray-500 px-2 py-1 rounded-md"
                  type="date"
                  onChange={(e) =>
                    setNewLecture({ ...newLecture, date: e.target.value })
                  }
                />
              </div>
              <button
                className="px-2 py-1 bg-black rounded-md"
                onClick={handleAddLecture}
              >
                Assign Lecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
