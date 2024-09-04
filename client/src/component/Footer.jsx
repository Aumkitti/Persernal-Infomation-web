import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 p-4 mt-8 flex justify-between items-center">
      <p className="text-left">&copy;2567 Personal Profile</p>
      <div className="flex space-x-4 text-right">
        <a href="#contact" className="hover:text-gray-600">
          Contact Us
        </a>
        <a href="#support" className="hover:text-gray-600">
          Support
        </a>
        <a href="#about" className="hover:text-gray-600">
          About
        </a>
      </div>
    </footer>
  );
};

export default Footer;
