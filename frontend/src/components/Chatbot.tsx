import { useState } from "react";

// Define the message type
interface Message {
    sender: "user" | "bot";
    text: string;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to chat
        const newMessage: Message = { sender: "user", text: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await fetch("http://localhost:8000/api/chatbot/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data: { reply: string } = await response.json();

            // Add bot response to chat
            const botMessage: Message = { sender: "bot", text: data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error communicating with chatbot:", error);
        }

        setInput(""); // Clear input field
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
