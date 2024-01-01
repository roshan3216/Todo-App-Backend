import express from 'express';
import { createTodo, deleteTodo, getAllTodos, searchTodo, updateTodo } from '../controllers/index.js';

const router = express.Router();

router.get('/',getAllTodos);
router.post('/',createTodo);
router.put('/',updateTodo);
router.delete('/',deleteTodo);
router.post('/search',searchTodo);

export default router;