import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConnectButton = ({ profile }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [disconnectMessage, setDisconnectMessage] = useState(""); // New state for disconnect message
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the connection state is already stored in localStorage
    const storedConnectionState = localStorage.getItem(`connectionState-${profile.id}`);
    if (storedConnectionState === "sent") {
      setIsConnected(true); // Set the button to show "Request Sent"
      setDisconnectMessage(""); // Clear any previous disconnect message
    } else {
      setIsConnected(false); // Default to unsent state
      setDisconnectMessage(""); // Clear disconnect message if not connected
    }
  }, [profile.id]); // Trigger effect on profile id change

  const handleClick = () => {
    if (isConnected) {
      // If the connection was already sent, unsend the connection
      setIsConnected(false); // Update the state to "unsent"
      localStorage.setItem(`connectionState-${profile.id}`, "unsent"); // Update localStorage
      setDisconnectMessage("Connection request has been unsent!"); // Display message immediately

      setTimeout(() => {
      setDisconnectMessage(""); }, 1000); // 1000ms = 1 second
    } else {
      // If the connection has not been sent, send it
      setIsConnected(true); // Update the state to "sent"
      localStorage.setItem(`connectionState-${profile.id}`, "sent"); // Save to localStorage
      navigate(`/SendConnections/${profile.id}`); // Navigate to send message page
      setDisconnectMessage(""); // Clear disconnect message after sending connection
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`px-4 py-2 border rounded-full transition-colors ${
          isConnected ? "bg-green-500 text-white" : "bg-blue-300 text-white border-blue-500"
        }`}
      >
        {isConnected ? "Request Sent" : "Connect"}
      </button>

      {/* Conditional message when disconnected */}
      {disconnectMessage && (
        <p
            className="absolute text-red-500 mt-2 px-4 py-2 bg-white border border-red-500 rounded-md shadow-md transition-all opacity-100 transform duration-300 ease-out"
            style={{
            top: "100%", // Adjust this depending on your layout
            left: "50%",
            transform: "translateX(-50%)",
            }}
        >
            {disconnectMessage}
        </p>
       )}
    </div>
  );
};

export default ConnectButton;