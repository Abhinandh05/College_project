import React, { useContext, useState, useEffect } from "react";
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "./context/Context";
import Sidebar from "./Sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useLoadUserQuery } from "@/features/api/authApi"; // Adjust the path as needed

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [isRecording, setIsRecording] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state for dark mode

  // Check if browser supports SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Fetch user profile data
  const { data, error, isLoading: userLoading } = useLoadUserQuery();

  // Handle speech result and update the input
  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Set the recognized speech as input
    };

    recognition.onstart = () => {
      setIsRecording(true); // Start recording
    };

    recognition.onend = () => {
      setIsRecording(false); // Stop recording
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsRecording(false); // Stop recording on error
    };
  }, [recognition]);

  // Start and stop the microphone recording
  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop(); // Stop the recording if it's active
    } else {
      recognition.start(); // Start the recording
    }
  };

  // If user data is loading, or error occurs, handle accordingly
  if (userLoading) return <div>Loading user data...</div>;
  if (error) return <div>Error loading user data</div>;

  // Extract the user's profile image URL from the fetched user data
  const profileImage = data?.user?.photoUrl || 'https://endertech.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Ffswbkokbwqb5%2F4vBAsCbQ9ITwI7Ym0MtXgY%2F96c4ec25d505f1b702f46a5a3d9dbe77%2FAI-Article-00.png&w=3840&q=75'; // Fallback to default image

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-100 to-gray-300'} min-h-screen`}>
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Header */}
        <div>
          <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-pink-500' : 'from-[#368ddd] to-[#ff5546]'}`}>
            NexusAI
          </p>
        </div>

        {/* Content */}
        <div className="max-w-[1000px] mx-auto py-10 px-6">
          {!showResult ? (
            <>
              {/* Greeting Section */}
              <div className="text-center my-10">
                <h1 className="text-[60px] font-extrabold">
                  <span className={`bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-pink-500' : 'from-[#368ddd] to-[#ff5546]'} bg-clip-text text-transparent`}>
                    Hello, I'm NexusAI.
                  </span>
                </h1>
                <p className="text-lg mt-4">{isDarkMode ? "How can I assist you today in dark mode?" : "How can I assist you today?"}</p>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[ 
                  { text: "What is MERN Stack", icon: <FaCompass />, gradient: isDarkMode ? "from-blue-600 to-purple-700" : "from-blue-400 to-purple-500" },
                  { text: "What is a loop in JavaScript?", icon: <FaLightbulb />, gradient: isDarkMode ? "from-green-600 to-teal-700" : "from-green-400 to-teal-500" },
                  { text: 'What is the difference between "var" and "let"?', icon: <FaMessage />, gradient: isDarkMode ? "from-yellow-600 to-orange-700" : "from-yellow-400 to-orange-500" },
                  { text: "What is React Router?", icon: <FaCode />, gradient: isDarkMode ? "from-pink-600 to-red-700" : "from-pink-400 to-red-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`h-[220px] p-5 bg-gradient-to-br ${item.gradient} rounded-3xl shadow-xl relative cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition duration-300`}
                  >
                    <p className="text-white text-lg font-semibold">{item.text}</p>
                    <div className="text-5xl absolute bottom-4 right-4 text-white opacity-90">{item.icon}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Results Section */
            <div className="py-6 px-8 max-h-[70vh] overflow-y-auto bg-white rounded-3xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profileImage} alt="User Profile" />
                </Avatar>
                <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{recentPrompt}</p>
              </div>
              <div>
                {loading ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="h-6 rounded bg-gradient-to-r from-blue-200 via-white to-blue-200 animate-pulse"></div>
                    <div className="h-6 rounded bg-gradient-to-r from-blue-200 via-white to-blue-200 animate-pulse"></div>
                    <div className="h-6 rounded bg-gradient-to-r from-blue-200 via-white to-blue-200 animate-pulse"></div>
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}
                  ></p>
                )}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="fixed bottom-6 w-full max-w-[1000px] px-6 mx-auto">
            <div className={`flex items-center justify-between gap-4 py-4 px-6 rounded-full shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <input
                type="text"
                placeholder="Enter a prompt here..."
                className={`flex-1 bg-transparent text-lg ${isDarkMode ? 'text-slate-300 placeholder-slate-400' : 'text-slate-700 placeholder-slate-400'} outline-none`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex gap-4 items-center">
                <FaMicrophone
                  onClick={toggleRecording}
                  className={`text-3xl cursor-pointer transition duration-300 ${isRecording ? "text-[#368ddd]" : isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                />
                {input && (
                  <IoMdSend
                    onClick={() => onSent()}
                    className="text-3xl text-[#368ddd] cursor-pointer hover:text-[#ff5546] transition duration-300"
                  />
                )}
              </div>
            </div>
            <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              NexusAI may display inaccurate info, including about people. Please double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
