import React, { useState } from "react";
import { RiChat3Line } from "react-icons/ri";
import { TiMicrophoneOutline } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";
import AnimationData from "../assets/Animation - 1746543453302.json";
import Lottie from "react-lottie";
import { FiSidebar } from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const getDescription = () => {
    switch (location.pathname) {
      case "/chat":
        return {
          title: "Chat AI",
          text: "I am an AI-powered chatbot designed to assist with your questions.",
        };
      case "/Transcription":
        return {
          title: "Voice to Text",
          text: "Upload your audio and get instant text transcriptions powered by AI.",
        };
      case "/setting":
        return {
          title: "Settings",
          text: "Manage your preferences, API keys, and customization options.",
        };
      default:
        return {
          title: "Welcome",
          text: "Navigate through the app using the sidebar options.",
        };
    }
  };

  return (
    <aside
      className={`flex flex-col  md:w-20${
        isCollapsed ? "w-20" : "w-64"
      } h-auto max-h-screen px-2 py-8 overflow-y-auto bg-secondaryLightBg border-r transition-all duration-300 dark:bg-secondaryDarkBg`}
    >
      <button
        onClick={toggleSidebar}
        className="hidden md:flex items-center gap-2 self-end mb-2 p-1 pr-2 text-white hover:text-gray-200"
      >
        <FiSidebar size={24} />
      </button>
      <div className="flex flex-col justify-between  ">
        <nav className="flex-1 space-y-2">
          <a
            className={`flex ${
              isCollapsed ? "justify-center" : "justify-start"
            } items-center px-2 py-2 text-white rounded-lg hover:bg-[#6e54a5] transition`}
            href="/chat"
          >
            <RiChat3Line size={24} />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium hidden md:flex">
                Chat
              </span>
            )}
          </a>

          <a
            className={`flex ${
              isCollapsed ? "justify-center" : "justify-start"
            } items-center px-2 py-2 text-white rounded-lg hover:bg-[#6e54a5] transition`}
            href="/Transcription"
          >
            <TiMicrophoneOutline size={24} />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium hidden md:flex">
                Transcription
              </span>
            )}
          </a>

          <a
            className={`flex ${
              isCollapsed ? "justify-center" : "justify-start"
            } items-center px-2 py-2 text-white rounded-lg hover:bg-[#6e54a5] transition`}
            href="/setting"
          >
            <FiSettings size={24} />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium hidden md:flex">
                Setting
              </span>
            )}
          </a>
        </nav>

        {!isCollapsed && (
          <div className="mt-20 hidden md:flex">
            <div className="p-3 bg-gray-100 dark:bg-darkBg rounded-lg">
              <h2 className="text-sm font-medium text-gray-800 dark:text-gray-50">
                {getDescription().title}
              </h2>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-100 mb-3">
                {getDescription().text}
              </p>
              <Lottie options={lottieOptions} height={150} width={150} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
