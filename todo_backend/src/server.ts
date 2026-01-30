import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

// 🔹 Load .env from root folder reliably
dotenv.config({ path: path.resolve(__dirname, "../.env") });




dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://todoapp-ten-ecru.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (_req, res) => {
  res.send("Todo API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
