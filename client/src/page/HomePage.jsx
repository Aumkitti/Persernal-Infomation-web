import React, { useState, useEffect } from "react";
import NavBar from "../component/Navbar";
import Footer from "../component/Footer";
import { FaUser } from "react-icons/fa";

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

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setBgPosition({
      x: clientX / window.innerWidth,
      y: clientY / window.innerHeight,
    });
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black"
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
      <NavBar user={user} />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-gray-950 bg-opacity-90 p-8 rounded-xl shadow-lg shadow-gray-800 max-w-lg w-full transform transition-transform duration-300 hover:scale-110">
          <div className="flex items-center mb-6">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mr-6 border border-gray-600"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-950 rounded-full mr-6 border border-gray-600">
                <FaUser className="text-gray-300 text-3xl" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-semibold mb-2 text-purple-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-400">นี่คือโปรไฟล์ส่วนตัวของคุณ</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-purple-900">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong className="text-gray-400">firstName:</strong>{" "}
                {user.firstName}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">lastName:</strong>{" "}
                {user.lastName}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">Email:</strong> {user.email}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">Date of Birth:</strong>{" "}
                {formatDate(user.dateOfBirth)}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">Gender:</strong> {user.gender}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">Address:</strong>{" "}
                {user.address}
              </p>
              <p className="text-gray-300">
                <strong className="text-gray-400">Phone Number:</strong>{" "}
                {user.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
