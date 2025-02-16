import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    // Redirect to editor
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
    toast.success("Room created");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Container divided into two parts */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Left side with the image */}
        <div className="hidden md:block md:relative md:left-[-10px]">
          <img
            src="/images/Image.png" // Directly reference the image path
            alt="Room"
            className="w-full h-auto object-cover rounded-l-lg shadow-lg"
          />
        </div>

        {/* Right side with the form */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-r-lg shadow-xl flex flex-col justify-center text-white">
          <h1 className="text-4xl font-bold mb-6">
            Welcome To <span className="text-yellow-300">Code Mate</span>
          </h1>
          <h4 className="text-lg mb-4 text-gray-300">
            Enter your Room ID and username to join the room
          </h4>

          <div className="mb-5">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm transition duration-200"
              placeholder="Enter ROOM ID"
              onKeyUp={handleInputEnter}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm transition duration-200"
              placeholder="Enter USERNAME"
              onKeyUp={handleInputEnter}
            />
          </div>

          <button
            onClick={joinRoom}
            className="w-full py-3 bg-black text-white border border-white rounded-lg font-semibold shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-transform duration-300"
          >
            Join Room
          </button>

          <p className="mt-8 text-gray-400">
            Don’t have an invite?{" "}
            <span
              onClick={generateRoomId}
              className="text-teal-300 cursor-pointer hover:text-teal-200 underline transition-colors duration-200"
            >
              Generate a New Room
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
