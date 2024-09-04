import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import Modal from "../component/Modal"; // Make sure to import your Modal component

const AnimatedCircle = ({ className }) => {
  const handleMouseEnter = (e) => {
    const circle = e.currentTarget;
    circle.style.transform = `translate(${Math.random() * 50 - 25}px, ${
      Math.random() * 50 - 25
    }px)`;
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

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    profilePicture: null,
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureFile(file);
    setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        setModalMessage("Registration successful!");
        setShowModal(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        const result = await response.json();
        setModalMessage(result.message || "Registration failed");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Registration failed");
      setShowModal(true);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
      <div className="flex relative bg-gray-950 bg-opacity-90 p-8 rounded-xl shadow-lg shadow-gray-800 max-w-5xl w-full">
        <div className="w-2/4 flex items-center justify-center">
          <img src="/public/Logo3.png" alt="Logo" className="h-80 w-80" />
        </div>
        <div className="md:w-2/4 w-full">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-100">
            ลงทะเบียน
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-row-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      ชื่อจริง<screen className="text-red">*</screen>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                      placeholder="Please fill in first name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      นามสกุล<screen className="text-red">*</screen>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                      placeholder="Please fill in last name"
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700"
                >
                  ถัดไป
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">อีเมล</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder="Please fill in email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    ชื่อผู้ใช้<screen className="text-red">*</screen>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder="Please fill in username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    รหัสผ่าน<screen className="text-red">*</screen>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder="Please fill in password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    ยืนยันรหัสผ่าน<screen className="text-red">*</screen>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700"
                >
                  ถัดไป
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 mt-2"
                >
                  ย้อนกลับ
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    ว/ด/ป เกิด<screen className="text-red">*</screen>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    Gender<screen className="text-red">*</screen>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700"
                >
                  ถัดไป
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 mt-2"
                >
                  ย้อนกลับ
                </button>
              </>
            )}
            {step === 4 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    ที่อยู่{" "}
                    <span className="text-gray-500">(ไม่จำเป็นต้องกรอก)</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder=" address "
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    เบอร์มือถือ{" "}
                    <span className="text-gray-500">(ไม่จำเป็นต้องกรอก)</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-lg p-3 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-800"
                    placeholder=" phone number "
                  />
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  <label className="block text-gray-400 mb-2">
                    รูปภาพ{" "}
                    <span className="text-gray-500">(ไม่จำเป็นต้องใส่)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profilePictureUpload"
                  />
                  <label
                    htmlFor="profilePictureUpload"
                    className="flex items-center cursor-pointer bg-purple-800 text-white p-1 rounded-md hover:bg-purple-700 hover:text-black"
                  >
                    <IoMdCloudUpload className="mr-2" /> Upload
                  </label>
                  {profilePictureFile && (
                    <img
                      src={URL.createObjectURL(profilePictureFile)}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700"
                >
                  ลงทะเบียน
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 mt-2"
                >
                  ย้อนกลับ
                </button>
              </>
            )}
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
          {showModal && (
            <Modal message={modalMessage} onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
