// filepath: /Users/david/Documents/Development/DevFest2025/DevFest2025/frontend/src/components/TypingIndicator.tsx
export const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-1 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-medical-primary animate-typing-dot" />
            <div className="h-2 w-2 rounded-full bg-medical-primary animate-typing-dot [animation-delay:0.2s]" />
            <div className="h-2 w-2 rounded-full bg-medical-primary animate-typing-dot [animation-delay:0.4s]" />
        </div>
    );
};