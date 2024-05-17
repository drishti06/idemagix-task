// src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [newLecture, setNewLecture] = useState({
    courseId: "",
    instructorId: "",
    date: "",
  });

  useEffect(() => {
    // Fetch instructors
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/instructors`)
      .then((res) => setInstructors(res.data));
  }, []);

  const handleAddCourse = () => {
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/courses`, newCourse)
      .then((res) => setCourses([...courses, res.data]));
  };

  const handleAddLecture = () => {
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/courses/${
          newLecture.courseId
        }/lectures`,
        newLecture
      )
      .then((res) => {
        // Update the course with new lecture
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Add Course</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Level"
          onChange={(e) =>
            setNewCourse({ ...newCourse, level: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) =>
            setNewCourse({ ...newCourse, image: e.target.value })
          }
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      <div>
        <h2>Assign Lecture</h2>
        <select
          onChange={(e) =>
            setNewLecture({ ...newLecture, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setNewLecture({ ...newLecture, instructorId: e.target.value })
          }
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>
              {instructor.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          onChange={(e) =>
            setNewLecture({ ...newLecture, date: e.target.value })
          }
        />
        <button onClick={handleAddLecture}>Assign Lecture</button>
      </div>
    </div>
  );
};

export default AdminPanel;
