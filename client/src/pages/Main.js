import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./Animation - 1711999006454.json"),
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      style={{
        backgroundImage:
          "radial-gradient(circle at center center, transparent 0%, rgb(0,0,0) 85%), linear-gradient(78deg, rgba(192, 192, 192,0.05) 0%, rgba(192, 192, 192,0.05) 50%,rgba(60, 60, 60,0.05) 50%, rgba(60, 60, 60,0.05) 100%), linear-gradient(227deg, rgba(97, 97, 97,0.05) 0%, rgba(97, 97, 97,0.05) 50%,rgba(52, 52, 52,0.05) 50%, rgba(52, 52, 52,0.05) 100%), linear-gradient(240deg, rgba(98, 98, 98,0.05) 0%, rgba(98, 98, 98,0.05) 50%,rgba(249, 249, 249,0.05) 50%, rgba(249, 249, 249,0.05) 100%), linear-gradient(187deg, rgba(1, 1, 1,0.05) 0%, rgba(1, 1, 1,0.05) 50%,rgba(202, 202, 202,0.05) 50%, rgba(202, 202, 202,0.05) 100%), linear-gradient(101deg, rgba(61, 61, 61,0.05) 0%, rgba(61, 61, 61,0.05) 50%,rgba(254, 254, 254,0.05) 50%, rgba(254, 254, 254,0.05) 100%), linear-gradient(176deg, rgba(237, 237, 237,0.05) 0%, rgba(237, 237, 237,0.05) 50%,rgba(147, 147, 147,0.05) 50%, rgba(147, 147, 147,0.05) 100%), linear-gradient(304deg, rgba(183, 183, 183,0.05) 0%, rgba(183, 183, 183,0.05) 50%,rgba(57, 57, 57,0.05) 50%, rgba(57, 57, 57,0.05) 100%), radial-gradient(circle at center center, hsl(351,4%,12%),hsl(351,4%,12%))",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-8">
        {/* Left Side: Text Section */}
        <div className="text-center md:text-left md:w-1/3 md:mr-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-blue-400">Code Mate</span>
          </h1>
          <p className="text-lg text-white mb-6">
            Code Mate is a powerful real-time code collaboration platform where
            users can join virtual rooms, work together on code in real-time,
            and execute it instantly. With Code Mate, multiple users can
            seamlessly edit the same code simultaneously, making it perfect for
            pair programming, team projects, or educational environments. The
            platform supports live code execution across various programming
            languages, ensuring immediate feedback and smooth collaboration.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-500 hover:bg-white hover:text-black text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Let's try
          </button>
        </div>

        {/* Right Side: Animation Section (hidden on mobile) */}
        <div className="hidden md:block mt-8 md:mt-0 w-full md:w-2/3">
          <div
            className="container mx-auto max-w-lg md:max-w-full"
            ref={container}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
