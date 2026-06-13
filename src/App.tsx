import { useState } from "react";

import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

import "./App.css";

import type { Todo, Filter } from './types'

import { createTodo, deleteTodo, toggleTodo, filterTodos } from './utils/todoUtils'


function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>("all");

    const addTodo = (text: string) => {
        setTodos(prev => [...prev, createTodo(text)])
    }

    const handleDelete = (id: number) => {
        setTodos(prev => deleteTodo(prev, id))
    }

    const handleToggle = (id: number) => {
        setTodos(prev => toggleTodo(prev, id))
    }

    const filteredTodos = filterTodos(todos, filter)

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Todo List
                </h1>

                <TodoInput onAdd={addTodo} />
                <TodoFilter current={filter} onChange={setFilter} />
                <TodoList todos={filteredTodos} onDelete={handleDelete} onToggle={handleToggle} />

            </div>
        </div>
    );
}

export default App;
