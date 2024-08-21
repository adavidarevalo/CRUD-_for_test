import { Request, Response } from 'express';
import { Todo } from '../models/todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todo' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  try {
    const todo = await Todo.create({ title, completed });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const [updated] = await Todo.update({ title, completed }, { where: { id } });
    if (updated) {
      const updatedTodo = await Todo.findByPk(id);
      res.json(updatedTodo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
