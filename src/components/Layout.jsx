import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 fixed top-0 left-0 right-0 z-30">
        <Navbar />
      </div>
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 px-4 ${
            isSidebarCollapsed ? "ml-20" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
