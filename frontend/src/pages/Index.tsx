import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartbeatLine from '../components/HeartbeatLine'; // Make sure this import is correct

const Index = () => {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("currentUser");
      setUsername(storedUser);
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isUserSignedIn = username !== null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden relative">
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0" 
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

      {/* Dot overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -50 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Heading with Merriweather font */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white font-merriweather"
          >
            {username ? `Welcome to MedLink, ${username}!` : "Welcome to MedLink!"}
          </motion.h1>
          
          {/* Subheading with Source Sans Pro font */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-source-sans"
          >
            Discover your future through personalized assistance.
          </motion.p>

          {/* Buttons */}
          <div className="flex justify-center space-x-6">
            {/* Forums Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onHoverStart={() => setIsHovered1(true)}
              onHoverEnd={() => setIsHovered1(false)}
              onClick={() => isUserSignedIn && navigate("/forum")}
              disabled={!isUserSignedIn}
              className={`relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 
                ${isUserSignedIn ? "bg-white text-black" : "bg-gray-400 text-gray-700 cursor-not-allowed"} font-source-sans`}
            >
              <span className="relative">Forums</span>
              <motion.span
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: isHovered1 ? 10 : 0, opacity: isHovered1 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>

            {/* Mentorship Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onHoverStart={() => setIsHovered2(true)}
              onHoverEnd={() => setIsHovered2(false)}
              onClick={() => isUserSignedIn && navigate("/profiles")}
              disabled={!isUserSignedIn}
              className={`relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 
                ${isUserSignedIn ? "bg-white text-black" : "bg-gray-400 text-gray-700 cursor-not-allowed"} font-source-sans`}
            >
              <span className="relative">Mentorship</span>
              <motion.span
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: isHovered2 ? 10 : 0, opacity: isHovered2 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Heartbeat Animation */}
      <HeartbeatLine />
    </div>
  );
};

export default Index;
