import React from "react";
import { useAuth } from "../context/AuthContext";
import Switch from "./Switch";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full text-white bg-lightBg shadow-md dark:bg-darkBg dark:text-white ">
      <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        <Link className="text-2xl font-semibold" to="/">
          Ai Chat
        </Link>

        <div className="flex items-center space-x-4">
          {currentUser && (
            <span className="capitalize dark:text-white">
              {currentUser.displayName || currentUser.email}
            </span>
          )}

          <Switch />

          <ul className="flex space-x-2 items-center">
            {!currentUser ? (
              <>
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 rounded"
                    to="/AuthForm"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 rounded"
                    to="/AuthForm"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <span
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 rounded cursor-pointer"
                  onClick={() => logOut()}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
