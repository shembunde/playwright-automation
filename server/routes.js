
import express from 'express';
const router = express.Router();

let todos = [];
let currentId = 1;

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'test' && password === '123') {
    return res.json({ token: 'mock-token' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/items', (req, res) => {
  res.json(todos);
});

router.post('/items', (req, res) => {
  const item = { id: currentId++, text: req.body.text };
  todos.push(item);
  res.status(201).json(item);
});

router.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos[index].text = req.body.text;
  res.json(todos[index]);
});

router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

export default router;
