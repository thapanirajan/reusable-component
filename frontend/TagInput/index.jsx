import { useState } from "react";

export default function TagInput({ label = "Tags", placeholder = "Type and press Enter", onChange }) {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                const newTags = [...tags, inputValue.trim()];
                setTags(newTags);
                if (onChange) onChange(newTags);
            }
            setInputValue("");
        }
    };

    const handleRemove = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        if (onChange) onChange(newTags);
    };

    return (
        <div className="mb-6">
            <label className="block text-zinc-500 mb-2 font-medium">{label}*</label>

            {/* Input field */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow duration-200 shadow-sm"
            />

            {/* Tags below input */}
            <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-blue-600 hover:text-red-500 font-bold transition-colors duration-200"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
