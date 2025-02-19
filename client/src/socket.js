// import { io } from "socket.io-client";

// export const initSocket = async () => {
//   const options = {
//     "force new connection": true,
//     reconnectionAttempt: "Infinity",
//     timeout: 10000,
//     transports: ["websocket"],
//   };
//   return io(process.env.REACT_APP_BACKEND_URL, options);
// };


import { io } from "socket.io-client";

// Get backend URL from environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"; 

// Initialize Socket.io connection
export const initSocket = () => {
    return io(BACKEND_URL, {
        transports: ["websocket"],
        withCredentials: true
    });
};

