import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);

  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log(`user connected : ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log(`User ${username} joined room ${room}`);
      socket.to(room).emit("user_joined", `${username} joined room`);
    });

    socket.on("message", ({ room, message, sender }) => {
      console.log(`Message from ${sender} in room ${room} :${message}`);
      socket.to(room).emit("message", { sender, message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected : ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`server running on http://${hostname}:${port}`);
  });
});

// {
// "dev": "node server.js",
//     "dev:socket": "NODE_OPTIONS='--loader ts-node/esm --trace-warnings --no-warnings' ts-node server.mts",
//     "build": "next build",
//     "start": "NODE_ENV=production node server.js",
//     "lint": "next lint"
// }
