import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from '../api/todos';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (title: string) => {
        try {
            const todo = await createTodo(title);
            setTodos(prev => [todo, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    const toggleTodo = async (id: string, completed: boolean) => {
        try {
            const updated = await updateTodo(id, { completed });
            setTodos(prev => prev.map(t => t.id === id ? updated : t));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    const removeTodo = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    return { todos, loading, error, addTodo, toggleTodo, removeTodo };
}
