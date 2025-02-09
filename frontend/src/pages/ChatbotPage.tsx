import { useState } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useToast } from "@/hooks/use-toast";
import { marked } from "marked";
import DOMPurify from "dompurify";

const INITIAL_MESSAGE: Message = {
    id: "welcome",
    content:
        "Hi! I'm your medical school interview assistant. I can help you practice and provide feedback on your interview responses. What would you like to discuss?",
    sender: "bot",
    timestamp: new Date(),
};

const ChatbotPage = () => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const { toast } = useToast();

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
            const response = await fetch("http://localhost:8000/api/chatbot/chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: content }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response from chatbot API");
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: DOMPurify.sanitize(marked.parse(data.content)),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to get response from chatbot.",
                variant: "destructive",
            });
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-medical-accent">
            <header className="bg-white border-b px-6 py-4">
                <h1 className="text-2xl font-semibold text-medical-primary">
                    Medical School Interview Assistant
                </h1>
            </header>

            <main className="flex-1 overflow-hidden">
                <div className="container mx-auto h-full max-w-4xl p-4">
                    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-lg border bg-white shadow-sm">
                        <div className="flex-1 space-y-4 overflow-y-auto p-4">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />

                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-medical-primary flex items-center justify-center">
                                        <span className="text-white text-xs">AI</span>
                                    </div>
                                    <TypingIndicator />
                                </div>
                            )}
                        </div>
                        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatbotPage;
