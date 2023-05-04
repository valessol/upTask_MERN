import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import projectsRoutes from "./routes/projects.js";
import tasksRoutes from "./routes/tasks.js";

const app = express();

dotenv.config();

connectDB();

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});


// Socket.io

import {Server} 'socket.io'

const io = new Server(server, {
  pingTimeout: 30000,
  cors: {
    origin: process.env.FRONTEND_URL,
  }
})

io.on('connection', (socket) => {
  console.log('Conectado a socket.io')
  socket.on('open-project', (projectId) => {
    socket.join(projectId)
  })
  socket.on('add-task', task => {
    // emitir este evento solo a las personas que tengan abierto ese proyecto, es decir, que estén en la sala
    socket.on(task.project).emit('task-added', task)
  })
  socket.on('delete-task', taskId => {
    socket.to(task.project).emit('task-deleted', taskId)
  })
  socket.on('update-task', task => {
    socket.to(task.project._id).emit('task-updated', task)
  })
  socket.on('change-state', task => {
    socket.to(task.project._id).emit('state-changed', task)
  })
})