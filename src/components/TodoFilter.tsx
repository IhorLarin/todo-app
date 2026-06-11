import type { Filter } from "../types";

type Props = {
    current: Filter
    onChange: (filter: Filter) => void
}

export default function TodoFilter({ current, onChange }: Props) {
    const filters: Filter[] = ["all", "active", "done"];

    return (
        <div className="flex gap-2 mb-4">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => onChange(filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        current === filter
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
