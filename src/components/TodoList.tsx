import TodoItem from './TodoItem'
import type { Todo } from '../types'

type Props = {
    todos: Todo[],
    onDelete: (id: number) => void,
    onToggle: (id: number) => void
}

export default function TodoList({ todos, onDelete, onToggle }: Props) {
    return (
        <ul className="flex flex-col gap-2">
            {todos.map(todo => (
                <li key={todo.id}>
                     <TodoItem
                         todo={todo}
                         onDelete={onDelete}
                         onToggle={onToggle}
                     />
                </li>
            ))}
        </ul>
    )
}
