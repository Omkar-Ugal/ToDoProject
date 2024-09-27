// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        if (newTodo) {
            await axios.post('/api/todos', { title: newTodo, completed: false });
            setNewTodo('');
            fetchTodos();
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
