const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 모든 할일 가져오기
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: 1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 날짜의 할일 가져오기
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const todos = await Todo.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ createdAt: 1 });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 할일 추가
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    priority: req.body.priority,
    completed: req.body.completed || false
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }

    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.description != null) {
      todo.description = req.body.description;
    }
    if (req.body.date != null) {
      todo.date = req.body.date;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }
    if (req.body.priority != null) {
      todo.priority = req.body.priority;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: '할일이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
