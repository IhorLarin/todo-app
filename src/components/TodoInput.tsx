import { useState } from "react";

type Props = {
    onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: Props) {
    const [value, setValue] = useState("");


    return (
        <div className="flex gap-2 mb-6">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Add a task..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={() => {
                    if (value.trim()) {
                        onAdd(value.trim());
                        setValue("");
                    }
                }}

                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
                Add
            </button>
        </div>
    )
}
