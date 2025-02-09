import { useState } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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

        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Thank you for your response. I'm analyzing it and will provide feedback shortly.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);

            toast({
                title: "Message sent",
                description: "Your message has been received and processed.",
            });
        }, 1500);
    };

    return (
        <div className="flex min-h-screen flex-col relative">
            <motion.div 
                className="absolute inset-0 z-0" 
                animate={{
                    background: [
                        `radial-gradient(circle at 20% 20%, #0EA5E9 0%, transparent 50%),
                         radial-gradient(circle at 75% 20%, #0EA5E9 0%, transparent 50%),
                         black`,
                        `radial-gradient(circle at 20% 20%, #0EA5E9 0%, transparent 55%),
                         radial-gradient(circle at 80% 80%, #0EA5E9 0%, transparent 55%),
                         black`,
                        `radial-gradient(circle at 30% 30%, #0EA5E9 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, #0EA5E9 0%, transparent 50%),
                         black`,
                    ]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)`,
                    backgroundSize: '30px 30px'
                }}
            />
            <header className="relative z-10 bg-white border-b px-6 py-4">
                <h1 className="text-2xl font-semibold text-medical-primary">
                    Medical School Interview Assistant
                </h1>
            </header>

            <main className="flex-1 overflow-hidden relative z-10">
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
