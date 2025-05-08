import React, { useState, useRef } from "react";
import Lottie from "react-lottie";
import Animation2 from "../assets/Animation -2.json";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "../assets/GoogleIcon.jsx";
import {
  toastSuccessNotify,
  toastErrorNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify.js";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { signUp, logIn, signUpProvider } = useAuth();
  const lottieRef = useRef(null);

  const lottieOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toastWarnNotify("Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toastWarnNotify("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        await logIn(email, password);
        toastSuccessNotify("Successfully logged in!");
      } else {
        await signUp(email, password);
        toastSuccessNotify("Account created successfully!");
      }
      navigate("/chat");
    } catch (err) {
      let errorMessage = "Authentication failed";

      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      }

      toastErrorNotify(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpProvider();
      toastSuccessNotify("Signed in with Google!");
      navigate("/chat");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };

  return (
    <section className="">
      <div className="container flex items-center justify-center py-10 px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <div ref={lottieRef}>
              <Lottie options={lottieOptions2} height={250} width={250} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/3 pb-4 font-medium text-center capitalize border-b-2 ${
                isLogin
                  ? "text-gray-800 border-blue-500 dark:text-white dark:border-[#9F7EE6]"
                  : "text-gray-500 dark:text-gray-100 dark:border-gray-400"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/3 pb-4 font-medium text-center capitalize border-b-2 ${
                !isLogin
                  ? "text-gray-800 border-[#9F7EE6] dark:text-white dark:border-[#9F7EE6]"
                  : "text-gray-500 dark:text-gray-200 dark:border-gray-400"
              }`}
            >
              Create an account
            </button>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              {/* Email icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              {/* Password icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                {/* Confirm password icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-lightBg rounded-lg hover:bg-secondaryLightBg focus:outline-none focus:ring focus:ring-[#9F7EE6] focus:ring-opacity-50 dark:bg-darkBg"
            >
              {isLogin ? "Login" : "Create an account"}
            </button>
          </div>

          <button
            className="flex items-center justify-center gap-2 btn-danger mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-lightBg rounded-lg hover:bg-[#9F7EE6] focus:outline-none focus:ring focus:ring-[#9F7EE6] focus:ring-opacity-50 dark:bg-darkBg"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon color="currentColor" />
            Continue with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
