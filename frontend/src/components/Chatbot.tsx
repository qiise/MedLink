import { useState } from "react";
import axios from "axios";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";

const INITIAL_MESSAGE: Message = {
    id: "welcome",
    content:
        "Hi! I'm your AI medical school interview assistant. Ask me anything about the interview process!",
    sender: "bot",
    timestamp: new Date(),
};

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await axios.post("http://localhost:8000/api/chatbot/chat/", {
                message: content,
            });

            if (response.data.reply) {
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: response.data.reply,
                    sender: "bot",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botMessage]);
            }
        } catch (error) {
            console.error("Error communicating with chatbot:", error);
        }

        setIsTyping(false);
    };

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
            </div>
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
    );
};

export default Chatbot;
