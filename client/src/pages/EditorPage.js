import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Client from "../components/Client";
import Editor from "../components/Editor";
import LanguageSelector from "../components/LanguageSelector";
import Output from "../components/Output";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions";

const EditorPage = () => {
  const editorRef = useRef();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
        selectedLanguage: codeRef.current,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, username }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });

      socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        setSelectedLanguage(language);
      });
    };

    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.log(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
      roomId,
      code: codeRef.current,
      language,
    });
  };

  const handleCodeChange = (code) => {
    codeRef.current = code;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for client list and actions */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4 border-b md:border-r border-gray-300 flex flex-col">
        <div className="flex items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Connected Members
          </h3>
        </div>
        <div className="flex-grow mb-4" style={{ maxHeight: "none" }}>
          {clients.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No connected members</div>
          )}
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-300 mt-1"
          onClick={copyRoomId}
        >
          Copy ROOM ID
        </button>
        <button
          className="w-full bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300 mt-1"
          onClick={leaveRoom}
        >
          Leave Room
        </button>
      </div>

      {/* Editor and output section */}
      <div className="w-full md:w-3/4 p-6 flex flex-col">
        <div className="mb-4">
          <LanguageSelector
            language={selectedLanguage}
            onSelect={handleLanguageSelect}
          />
        </div>
        <div className="flex-1 flex flex-col">
          {/* Code Editor Section */}
          <div className="flex-1 border-t border-gray-300 p-2 mb-4">
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              selectedLanguage={selectedLanguage}
              onCodeChange={handleCodeChange}
            />
          </div>
          {/* Output Section at the Bottom */}
          <div>
            <Output editorRef={codeRef} language={selectedLanguage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;