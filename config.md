pure js file as per docs of socket.io
"dev": "next dev",
"dev:socket": "tsx server.ts",
"build": "next build",
"build:socket": "next build && tsc --project tsconfig.server.json",
"start": "next start",
"start:socket": "cross-env NODE_ENV=production node dist/server.js",
"lint": "next lint"

# Setting Up a Next.js Server with Socket.io (TypeScript)

## 1️⃣ Create `server.ts`

Create a file named `server.ts` and add the following code:

```typescript
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
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log(`User ${username} joined room ${room}`);
      socket.to(room).emit("user_joined", `${username} joined room`);
    });

    socket.on("message", ({ room, message, sender }) => {
      console.log(`Message from ${sender} in room ${room}: ${message}`);
      socket.to(room).emit("message", { sender, message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});

## step-2
npm i tsx
{
  "scripts": {
    "dev:socket": "tsx server.ts",
  }
}

step 3
npm install ts-node

step-4
{
  "rules": {
    "@typescript-eslint/no-require-imports": "off"
  }
}

step-5
include server.ts change      "moduleResolution": "Bundler",  to     "moduleResolution": "Node",
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "server.mts"
  ],
  "exclude": ["node_modules"]
}

step-6
for bulid & start command we need to add this file
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2017",
    "outDir": "./dist",
    "moduleResolution": "Node",
    "strict": true,
    "noEmit": false,
    "isolatedModules": false
  },
  "include": ["server.ts"]
}
 step-7
 "build:socket": "next build && tsc --project tsconfig.server.json",
"start:socket": "cross-env NODE_ENV=production node dist/server.js",


This markdown file is easy to read and can be saved for future reference. 🚀

```
