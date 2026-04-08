'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/context/AuthContext";
import { useTodos } from "@/lib/hooks/useTodos";

export default function TodosPage() {
    const [title, setTitle] = useState('');
    const { user, logout } = useAuth();
    const { todos, loading, error, addTodo, toggleTodo, removeTodo } = useTodos();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addTodo(title);
        setTitle('');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">TODO App</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Вийти
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Нова задача..."
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Додати
                    </button>
                </form>

                {todos.length === 0 ? (
                    <p className="text-center text-gray-500">Задач поки немає</p>
                ) : (
                    <ul className="space-y-2">
                        {todos.map(todo => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, !todo.completed)}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.title}
                </span>
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Видалити
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
