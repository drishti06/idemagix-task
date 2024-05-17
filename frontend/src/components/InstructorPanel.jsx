// src/components/InstructorPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstructorPanel = () => {
  const [lectures, setLectures] = useState([]);
  const instructorId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    } else {
      axios
        .get(
          `${
            import.meta.env.VITE_BASEURL
          }/api/instructors/${instructorId}/lectures`
        )
        .then((res) => {
          console.log("data", res.data);
          setLectures(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [instructorId]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-3xl">Instructor Panel</h1>
      {lectures.length > 0 ? (
        <table className="border text-xl flex w-max">
          <div className="flex flex-col">
            <th className="border p-2">Date</th>
            <td className="flex  flex-col">
              {lectures.map((lecture) => (
                <span className="p-2 border" key={lecture._id}>
                  {lecture.date.slice(0, 10)}
                </span>
              ))}
            </td>
          </div>
          <div className="flex flex-col">
            <th className="border p-2">Course Name</th>
            <td className="flex flex-col">
              {lectures.map((lecture) => (
                <span className="border p-2 capitalize" key={lecture._id}>
                  {lecture.courseName}
                </span>
              ))}
            </td>
          </div>
        </table>
      ) : (
        <div>No lectures yet</div>
      )}
    </div>
  );
};

export default InstructorPanel;
