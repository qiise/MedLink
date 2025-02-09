import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const MembershipPrices = () => {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const tierDetails = {
    Basic: {
      price: "$5/month",
      benefits: [
        "Access to monthly group mentorship sessions",
        "Engage with experienced mentors and fellow students",
        "Receive general advice in a collaborative setting"
      ]
    },
    Premium: {
      price: "$20/month",
      benefits: [
        "All Basic Membership benefits",
        "2 personalized, one-on-one mentorship sessions per month",
        "Direct, individualized guidance for focused support"
      ]
    },
    Elite: {
      price: "$40/month",
      benefits: [
        "All Premium Membership benefits",
        "Weekly personalized, one-on-one mentorship sessions",
        "In-depth career guidance",
        "Priority scheduling for mentorship sessions"
      ]
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden relative pt-10 px-20">
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
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Dot overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="flex flex-col items-center justify-start z-10 h-full">
        <button
          onClick={() => navigate("/profiles")}
          className="self-start ml-4 flex items-center gap-2 text-white hover:text-gray-300 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mentors
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">Unlock the Perfect Plan for Your Pre-Med Journey</h1>
        <p className="text-xl text-white text-center mb-4">
          Whether you're just starting out or looking for high-level mentorship, we offer three membership tiers tailored to your needs:
        </p>
        <div className="flex space-x-8 mt-4">
          {Object.keys(tierDetails).map((tier) => (
            <div key={tier} className="relative group w-[350px]">
              {/* Animated border container only on hover */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-600 to-white opacity-0 rounded-lg blur transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Content container */}
              <div className="relative bg-black h-[400px] p-6 rounded-lg border border-gray-800">
                <div className="h-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black rounded-lg p-6">
                  <h1 className="text-xl font-bold text-white mb-2 tracking-wider text-center">{tier} Membership</h1>
                  <h2 className="text-lg text-cyan-400 mb-4">{tierDetails[tier].price}</h2>
                  <ul className="text-lg text-gray-300 list-disc list-inside leading-relaxed text-center">
                    {tierDetails[tier].benefits.map((benefit, index) => (
                      <li key={index} className="pl-2">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPrices;
