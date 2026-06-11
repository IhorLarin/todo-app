import { useState } from "react";
import "./App.css";

type Todo = {
    id: number
    text: string
    done: boolean
};

type Filter = "all" | "active" | "done";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>("all");

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            done: false,
        };

        setTodos(prev => [...prev, newTodo]);
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(prev => prev.map(todo => {
            return todo.id === id ? { ...todo, done: !todo.done } : todo;
        }));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "done") return todo.done;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Todo List
                </h1>

                {/* TodoInput */}
                {/* TodoFilter */}
                {/* TodoList */}
            </div>
        </div>
    );
}

export default App;
