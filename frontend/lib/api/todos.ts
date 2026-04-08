import request from './client';

export interface Todo {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export const getTodos = () =>
    request<Todo[]>('/api/todos');

export const createTodo = (title: string) =>
    request<Todo>('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ title }),
    });

export const updateTodo = (id: string, data: Partial<Pick<Todo, 'title' | 'completed'>>) =>
    request<Todo>(`/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

export const deleteTodo = (id: string) =>
    request<{ message: string }>(`/api/todos/${id}`, {
        method: 'DELETE',
    });
