import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const MembershipPrices = () => {
  const navigate = useNavigate();

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
      
      <div className="flex flex-col items-center justify-center z-10 h-full py-20">
        <button
          onClick={() => navigate("/profiles")}
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-6 self-start ml-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mentors
        </button>

        <div className="bg-gray-200 w-[500px] h-60 mb-4 p-4 border border-gray-400 rounded">
          <h1 className="text-2xl text-center mb-4">Basic Membership</h1>
          <p className="text-lg text-center">Body text for basic membership. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="bg-gray-200 w-[500px] h-60 mb-4 p-4 border border-gray-400 rounded">
          <h1 className="text-2xl text-center mb-4">Premium Membership</h1>
          <p className="text-lg text-center">Body text for premium membership. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="bg-gray-200 w-[500px] h-60 p-4 border border-gray-400 rounded">
          <h1 className="text-2xl text-center mb-4">Elite Membership</h1>
          <p className="text-lg text-center">Body text for elite membership. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  );
};

export default MembershipPrices;
