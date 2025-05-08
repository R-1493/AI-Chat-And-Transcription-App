import React, { useState, useEffect } from "react";
import {
  toastSuccessNotify,
  toastWarnNotify,
  toastErrorNotify,
} from "../helpers/ToastNotify";

const Setting = () => {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("openai-api-key");
    if (storedKey) {
      setSavedKey(storedKey);
      setApiKey(storedKey);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("openai-api-key", apiKey);
      setSavedKey(apiKey);
      toastSuccessNotify("API key saved!");
    } else {
      toastWarnNotify("Please enter a valid API key.");
    }
  };

  const handleDelete = () => {
    try {
      localStorage.removeItem("openai-api-key");
      setSavedKey("");
      setApiKey("");
      toastSuccessNotify("API key deleted.");
    } catch (err) {
      toastErrorNotify("Failed to delete API key.");
    }
  };
  return (
    <section className="flex items-center justify-center h-full px-4 py-12">
      <div className="flex flex-col max-w-4xl w-full overflow-hidden bg-secondaryLightBg rounded-lg shadow-lg md:flex-row md:h-64">
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-[#a280ea] dark:bg-secondaryDarkBg">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <h2 className="text-lg font-bold text-gray-100 md:text-gray-100  dark:text-white">
              Open API key
            </h2>
            <p className="mt-2 text-sm text-gray-300 md:text-gray-200">
              To access the Open API, please obtain your unique API key from the
              Open API platform. You can then authenticate your requests by
              including this key in the headers of your API calls.
            </p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-800 dark:text-blue-300"
            >
              Get your key
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-6 md:py-0 md:w-1/2 gap-4 dark:bg-darkBg">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg focus-within:ring dark:bg-superDarkBg focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 lg:flex-row">
              <input
                className="px-6 py-2 w-full text-gray-100 placeholder-gray-500 bg-lightBg outline-none focus:placeholder-transparent dark:text-white dark:bg-superDarkBg"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
              <button
                type="submit"
                className="px-4 py-3 mx-2 mt-2 lg:mt-0 text-sm font-medium tracking-wider text-white uppercase bg-lightBg dark:bg-secondaryDarkBg rounded-md hover:bg-gray-600 focus:outline-none"
              >
                {savedKey ? "Update" : "Add"}
              </button>
            </div>
          </form>

          {savedKey && (
            <button
              onClick={handleDelete}
              className="text-sm text-red-500 underline hover:text-red-700"
            >
              Delete saved key
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Setting;
