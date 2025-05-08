import React from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
