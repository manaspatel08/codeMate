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

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true
});

export default socket;
