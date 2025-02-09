import { useState } from "react";
import { motion } from "framer-motion";

const MembershipPrices = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const tierText = {
    Basic: "For $5 a month, start your mentorship journey with our Basic Membership. You will gain access to monthly group mentorship sessions, where you can engage with experienced mentors and fellow students. These sessions offer general advice and is ideal for those seeking foundational guidance in a collaborative setting.  ",
    Premium: "For $20 a month, unlock deeper connections and more valuable resources with our Premium Membership. You will gain all of the benefits of the Basic Tier alongside access to two personalized, one-on-one mentorship sessions per month. Students will benefit from direct, individualized guidance, and this tier is designed for students looking for a more focused support in their pre-med journey.",
    Elite: "for $40 a month, maximize your success with our Elite Membership. In addition to the Basic Membership benefits, enjoy four personalized, one-on-one mentorship sessions, in-depth career guidance, and priority scheduling designed to help you thrive in your pre-med journey. This tier is ideal for students who wish to gain the highest level of mentorship and guidance from seasoned professionals."
  };

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
      <div className="flex flex-col items-center justify-center z-10 h-full py-20">
        <h1 className="text-2xl font-bold text-white mb-4 "> Unlock the Perfect Plan for Your Pre-Med Journey </h1>
        <p className="text-lg text-gray-300 text-center mb-10 ">
                            Whether you're just starting out or looking for high-level mentorship, we offer three membership tiers tailored to your needs:
        </p>
        <div className="space-y-8">
          {["Basic", "Premium", "Elite"].map((tier) => (
            <div key={tier} className="relative group">
              {/* Animated border container with smoother transition */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-600 to-white opacity-50 rounded-lg blur transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Content container */}
              <div className="relative bg-black w-[800px] h-60 p-6 rounded-lg border border-gray-800">
                <div className="h-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-white mb-4 tracking-wider">{tier} Membership</h1>
                  <p className="text-lg text-gray-300 text-center leading-relaxed">
                    {tierText[tier]}
                  </p>
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
