
import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/items').then(res => res.json()).then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const updateTodo = async () => {
    const res = await fetch(`http://localhost:5000/items/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === updated.id ? updated : t));
    setEditing(null);
    setText('');
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Todos</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={editing ? updateTodo : addTodo}>{editing ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => { setEditing(t); setText(t.text); }}>Edit</button>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
