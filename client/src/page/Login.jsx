import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../component/Modal";

const AnimatedCircle = ({ className }) => {
  const handleMouseEnter = (e) => {
    const circle = e.currentTarget;
    circle.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`;
  };

  const handleMouseLeave = (e) => {
    const circle = e.currentTarget;
    circle.style.transform = "translate(0, 0)";
  };

  return (
    <div
      className={`absolute rounded-full filter blur-xl opacity-60 transition-transform duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", formData.username);

        setModalMessage("Login successful!");
        setShowModal(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setModalMessage(result.message || "Login failed");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Login failed");
      setShowModal(true);
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setBgPosition({
      x: clientX / window.innerWidth,
      y: clientY / window.innerHeight,
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundPosition: `${bgPosition.x * 50}px ${bgPosition.y * 50}px`,
          transition: "background-position 0.1s",
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <AnimatedCircle className="top-10 left-20 w-24 h-24 bg-purple-950" />
          <AnimatedCircle className="top-32 left-56 w-20 h-20 bg-green-950" />
          <AnimatedCircle className="top-56 left-32 w-28 h-28 bg-blue-950" />
          <AnimatedCircle className="bottom-10 right-20 w-24 h-24 bg-red-950" />
          <AnimatedCircle className="bottom-32 right-56 w-20 h-20 bg-indigo-950" />
        </div>
      </div>
      <div className="relative bg-gray-950 bg-opacity-90 p-8 rounded-xl shadow-lg shadow-gray-800 max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-100">
          เข้าสู่ระบบ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-700 rounded-lg p-3 bg-black text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-700 rounded-lg p-3 bg-black text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            เข้าสู่ระบบ
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Login;
