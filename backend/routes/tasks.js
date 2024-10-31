// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create Task
router.post('/', async (req, res) => {
    const { name, description, dueDate, status, priority, assignedTo, comments } = req.body;
    const task = new Task({
      name,
      description,
      dueDate,
      status,
      priority,
      assignedTo, // Save assigned user
      comments: [] // Initialize comments
    });
    try {
      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get All Tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Task
router.put('/:id', async (req, res) => {
    try {
      const { name, description, dueDate, status, priority, assignedTo, comments } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        name,
        description,
        dueDate,
        status,
        priority,
        assignedTo, // Update assigned user
        comments: comments.split('\n').map(comment => ({ text: comment.trim(), user: 'CurrentUser' })) // Process comments
      }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
