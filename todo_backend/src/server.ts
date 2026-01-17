import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import todoRoutes from "./routes/todoRoutes";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
