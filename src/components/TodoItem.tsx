import type { Todo } from '../types'

type Props = {
    todo: Todo
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

export default function TodoItem({ todo, onDelete, onToggle }: Props) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border ${
            todo.done ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
        }`}>
            <input
                type="checkbox"
                checked={todo.done}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
                onChange={() => onToggle(todo.id)}
            />
            <span className={`flex-1 text-sm ${
                todo.done ? 'line-through text-gray-400' : 'text-gray-700'
            }`}>
        {todo.text}
      </span>
            <button
                className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                onClick={() => onDelete(todo.id)}
            >
                ×
            </button>
        </div>
    )
}
