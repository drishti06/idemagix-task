// src/components/Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/login`,
        { email, password }
      );
      if (res.data.role === "admin") {
        localStorage.setItem("authority", true);
        navigate("/admin-panel");
      } else if (res.data.role === "instructor") {
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("user", res.data.name);
        navigate("/instructor");
      }
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      navigate("/admin-panel");
    } else if (localStorage.getItem("id")) {
      navigate("/instructor");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="border w-[30rem] h-[30rem] justify-center rounded-md flex flex-col gap-5 items-center">
        <h1 className="text-5xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-xl">{error}</p>}
        <form
          className="flex w-full p-5 flex-col gap-5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email" className="text-xl">
              Enter email
            </label>
            <input
              className="border w-full border-gray-500 px-2 py-1 rounded-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border border-gray-500 px-2 py-1 rounded-md"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="px-3 py-2 bg-black rounded-md" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
