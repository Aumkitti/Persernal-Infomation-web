import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Menu } from "@headlessui/react";

const NavBar = ({ user }) => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-950 text-gray-500 p-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">Personal Profile</div>
      <div className="relative">
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <div className="flex items-center space-x-4 cursor-pointer">
                <div>
                  <p className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <Menu.Button>
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-950 border border-gray-600 rounded-full">
                      <FaUser className="text-white text-2xl" />
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Menu.Items
                as="div"
                className={`absolute right-0 mt-2 w-48 bg-gray-950 border border-gray-600 shadow-lg rounded-lg ${
                  open ? "block" : "hidden"
                }`}
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`flex items-center px-4 py-2 text-sm w-full ${
                          active ? "bg-gray-800 text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
