import React, { useState, useRef } from "react";
import OpenAI from "openai";

const Transcription = () => {
  const [status, setStatus] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const transcribe = async (file) => {
    setStatus("loading");
    setTranscription("");
    setFileName(file.name);

    try {
      const apiKey = localStorage.getItem("openai-api-key");
      if (!apiKey) throw new Error("API key not found in localStorage");

      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const response = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
        language: "en",
      });

      setTranscription(response.text);
      setStatus("success");
    } catch (error) {
      console.error("Transcription error:", error);
      setStatus("error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      transcribe(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      transcribe(file);
    } else {
      alert("Please drop a valid audio file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full px-4 py-12">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center w-full max-w-lg p-5 text-center 
               bg-lightBg border-2 border-gray-300 border-dashed cursor-pointer 
               dark:bg-darkBg dark:border-secondaryLightBg rounded-xl"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 
       5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>

        <h2 className="mt-1 font-medium tracking-wide text-white ">
          Upload Audio
        </h2>
        <p className="mt-2 text-xs tracking-wide text-white">
          Upload or drag & drop your audio file (MP3, WAV, etc.)
        </p>
        <input
          ref={fileInputRef}
          id="dropzone-file"
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {status === "loading" && (
        <p className="mt-4 text-sm text-yellow-600">Processing file...</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">Transcription failed.</p>
      )}
      {status === "success" && (
        <p className="mt-4 text-sm text-green-600">Transcription complete!</p>
      )}

      {fileName && <p className="mt-2 text-sm text-white">File: {fileName}</p>}

      {transcription && (
        <div className="mt-6 bg-lightBg dark:bg-darkBg p-4 rounded-lg text-white w-full max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Transcription</h3>
            <button
              onClick={handleCopy}
              className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="whitespace-pre-wrap text-gray-300">{transcription}</p>
        </div>
      )}
    </section>
  );
};

export default Transcription;
