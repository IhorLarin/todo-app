import type { Todo, Filter } from '../types'

export const createTodo = (text: string): Todo => ({
    id: Date.now(),
    text,
    done: false,
})

export const deleteTodo = (todos: Todo[], id: number): Todo[] =>
    todos.filter(todo => todo.id !== id)

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
    todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)

export const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
    if (filter === 'active') return todos.filter(todo => !todo.done)
    if (filter === 'done') return todos.filter(todo => todo.done)
    return todos
}
