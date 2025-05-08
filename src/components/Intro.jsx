import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import { gsap } from "gsap";
import AnimationData from "../assets/Animation - 1746543453302.json";
import Animation2 from "../assets/Animation -2.json";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Intro = () => {
  const lottieRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLetsTalk = () => {
    if (currentUser) {
      navigate("/chat");
    } else {
      navigate("/AuthForm");
    }
  };
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    gsap.set(lottieRef.current, { x: 300, y: 100, opacity: 1 });

    tl.to(lottieRef.current, {
      x: 0,
      y: 400,
      opacity: 1,
      duration: 6,
    }).to(lottieRef.current, {
      x: -300,
      y: 100,
      duration: 6,
    });
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lottieOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className="relative flex flex-col items-center justify-between pt-24">
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Lottie options={lottieOptions2} height={400} width={400} />
          </div>
          <h1
            className="relative z-10 text-2xl font-bold text-white text-center w-80 h-80 flex items-center justify-center"
            style={{ textShadow: "4px 4px 6px rgba(0, 0, 0, 0.2)" }}
          >
            Hi, how can I help you?
          </h1>
        </div>
        <div className="w-full flex justify-center mb-20 relative z-20">
          <button
            className="h-12 w-48 bg-lightBg dark:bg-darkBg text-white rounded-lg shadow-md hover:bg-[#8B6DD5] transition"
            onClick={handleLetsTalk}
          >
            Let’s talk
          </button>
        </div>
        <div
          className="pointer-events-none absolute inset-0 flex w-full justify-center"
          ref={lottieRef}
        >
          <Lottie options={lottieOptions} height={200} width={200} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
