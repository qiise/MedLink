// filepath: /Users/david/Documents/Development/DevFest2025/DevFest2025/frontend/src/components/ChatInput.tsx
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t p-4 bg-white"
        >
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-medical-primary focus:outline-none focus:ring-1 focus:ring-medical-primary"
                disabled={disabled}
            />
            <button
                type="submit"
                disabled={disabled || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-primary text-white transition-colors hover:bg-opacity-90 disabled:opacity-50"
            >
                <Send className="h-4 w-4" />
            </button>
        </form>
    );
};