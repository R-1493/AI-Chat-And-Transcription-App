import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import AnimationData from "../assets/Animation3.json";
import Lottie from "react-lottie";
import { FiUser, FiMic, FiMicOff } from "react-icons/fi";
import { useRef } from "react";
import gsap from "gsap";

const Chat = () => {
  const currentUser = { photoURL: null };
  const messageEndRef = useRef(null);

  const userProfileImage = currentUser?.photoURL || "/default-avatar.png";

  const [messages, setMessages] = useState([
    { role: "assistant", content: "How can I help you today?" },
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const apiKey = localStorage.getItem("openai-api-key");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = "en-US";
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onstart = () => {
          setIsListening(true);
        };

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          setMessages([
            ...messages,
            {
              role: "assistant",
              content:
                "Sorry, I couldn't understand your voice. Please try again or type your message.",
            },
          ]);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      } else {
        console.warn("Speech Recognition API not supported in this browser");
        setMessages([
          ...messages,
          {
            role: "assistant",
            content:
              "Voice input is not supported in your browser. Please type your message.",
          },
        ]);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  if (!apiKey) {
    return (
      <div className="p-4 text-center text-red-500">
        No API key found. Please go to the{" "}
        <a href="/setting" className="underline text-blue-500">
          Settings
        </a>{" "}
        page and enter your OpenAI key.
      </div>
    );
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const reply = response.choices[0]?.message?.content;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Error calling OpenAI:", err);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition) {
      setMessages([
        ...messages,
        {
          role: "assistant",
          content: "Voice input is not available in your browser.",
        },
      ]);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setInput("");
      recognition.start();
    }
  };
  const messageRefs = useRef([]);

  useEffect(() => {
    if (messageRefs.current.length > 0) {
      const lastIndex = messageRefs.current.length - 1;
      const el = messageRefs.current[lastIndex];
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      }
    }
  }, [messages]);

  return (
    <div className="p-4 pt-20 mb-20 h-[calc(100vh-160px)] overflow-y-auto">
      <ul className="space-y-4">
        {messages.map((msg, idx) => (
          <li
            key={idx}
            ref={(el) => (messageRefs.current[idx] = el)}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-16 h-16 rounded-full bg-white dark:bg-su pt-4 flex items-center justify-center overflow-hidden">
                <div className="w-15 h-15">
                  <Lottie options={lottieOptions} height={80} width={80} />
                </div>
              </div>
            )}
            <div
              className={`inline-block p-3 rounded-xl max-w-[75%] ${
                msg.role === "user"
                  ? "bg-lightBg text-white shadow-customLightShadow dark:shadow-customDarkShadow"
                  : "bg-white text-gray-800 dark:bg-superDarkBg dark:text-white shadow-customLightShadow dark:shadow-customDarkShadow"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {userProfileImage ? (
                  <img
                    src={userProfileImage}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FiUser size={32} className="text-gray-500" />
                )}
              </div>
            )}
          </li>
        ))}
        {isLoading && (
          <li className="text-left">
            <div className="inline-block p-3 rounded-xl bg-gray-200 text-gray-800">
              Thinking...
            </div>
          </li>
        )}{" "}
        <div ref={messageEndRef} />
      </ul>

      <div className="fixed bottom-4 w-full max-w-3xl  sm:min-w-fit px-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
            className="w-full p-2 border rounded"
            placeholder={
              isListening ? "Listening... Speak now" : "Type a message"
            }
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-lightBg dark:bg-darkBg text-white px-4 rounded disabled:opacity-50"
          >
            Send
          </button>
          <button
            onClick={toggleVoiceInput}
            disabled={isLoading}
            className={`px-4 rounded flex items-center justify-center ${
              isListening ? "bg-red-500 text-white" : "bg-lightBg text-white"
            }`}
          >
            {isListening ? (
              <FiMicOff size={20} className="animate-pulse" />
            ) : (
              <FiMic size={20} />
            )}
          </button>
        </div>
        {isListening && (
          <div className="text-center text-sm text-gray-500 mt-2">
            Speak now... (click mic again to cancel)
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
