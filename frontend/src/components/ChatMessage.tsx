// filepath: /Users/david/Documents/Development/DevFest2025/DevFest2025/frontend/src/components/ChatMessage.tsx
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { MessageSquare, User } from "lucide-react";

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isBot = message.sender === "bot";

    return (
        <div
            className={cn(
                "flex w-full items-start gap-2 animate-message-fade-in",
                isBot ? "flex-row" : "flex-row-reverse"
            )}
        >
            <div
                className={cn(
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
                    isBot ? "bg-medical-primary text-white" : "bg-medical-secondary"
                )}
            >
                {isBot ? (
                    <MessageSquare className="h-4 w-4" />
                ) : (
                    <User className="h-4 w-4 text-medical-primary" />
                )}
            </div>
            <div
                className={cn(
                    "flex min-h-[40px] max-w-[85%] items-center rounded-lg px-4 py-2 text-sm",
                    isBot
                        ? "bg-medical-secondary text-gray-800"
                        : "bg-medical-primary text-white"
                )}
            >
                {message.content}
            </div>
        </div>
    );
};