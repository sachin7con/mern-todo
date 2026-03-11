const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authController = require('../middleware/authMiddleware');

router.get('/', authController, todoController.getTodos);
router.post('/', authController, todoController.createTodo);
router.put('/:id', authController, todoController.updateTodo);
router.delete('/:id', authController, todoController.deleteTodo);

module.exports = router;