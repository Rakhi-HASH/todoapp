import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/authMiddleware";

// Define body type
interface CreateTaskBody {
  title: string;
  dueDate?: string;  // dueDate is optional
  completed?: boolean;
}

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: req.body.completed ?? false,

      // 🔥 DO NOT convert to Date
      dueDate: req.body.dueDate || "",

      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};


// GET TASKS
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// UPDATE TASK
export const updateTask = async (
  req: AuthRequest & { body: Partial<CreateTaskBody> },
  res: Response
) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
