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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
