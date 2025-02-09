// filepath: /Users/david/Documents/Development/DevFest2025/DevFest2025/frontend/src/types/chat.ts
export type Message = {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: Date;
};