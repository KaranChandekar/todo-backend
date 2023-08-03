import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
  });
};

export const getMyTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
