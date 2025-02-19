// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const ACTIONS = require("./Actions");  // ✅ Correct path



// const server = http.createServer(app);
// const io = new Server(server);

// const userSocketMap = {};
// function getAllConnectedClients(roomId) {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//     (socketId) => {
//       return {
//         socketId,
//         username: userSocketMap[socketId],
//       };
//     }
//   );
// }

// io.on("connection", (socket) => {
//   console.log("socket connected", socket.id);

//   socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
//     userSocketMap[socket.id] = username;
//     socket.join(roomId);
//     const clients = getAllConnectedClients(roomId);
//     clients.forEach(({ socketId }) => {
//       io.to(socketId).emit(ACTIONS.JOINED, {
//         clients,
//         username,
//         socketId: socket.id,
//       });
//     });
//   });

//   socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
//     socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
//     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on("disconnecting", () => {
//     const rooms = [...socket.rooms];
//     rooms.forEach((roomId) => {
//       socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
//         socketId: socket.id,
//         username: userSocketMap[socket.id],
//       });
//     });
//     delete userSocketMap[socket.id];
//     socket.leave();
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const ACTIONS = require("./Actions");

dotenv.config();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: "https://your-frontend.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://your-frontend.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on("connection", (socket) => {
    console.log("✅ New WebSocket connection:", socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
