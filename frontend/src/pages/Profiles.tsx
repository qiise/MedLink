import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

const Profiles = () => {
  const sampleMentors = [
    {
      name: "Dr. Lydia Chilton",
      title: "Medical Student Mentor",
      specialty: "Internal Medicine",
      school: "Harvard Medical School",
      imageUrl: "/mentor1.jpg"
    },
    {
      name: "Dr. Jae Woo Lee",
      title: "Admissions Advisor",
      specialty: "Pediatrics",
      school: "Stanford Medicine",
      imageUrl: "/mentor2.jpg"
    },
    {
      name: "Dr. Brian Borowski",
      title: "Research Mentor",
      specialty: "Neurology",
      school: "Johns Hopkins Medicine",
      imageUrl: "/mentor3.jpg"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 relative">
      <ScrollArea className="h-[calc(100vh-4rem)]">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <h1 className="flex items-center justify-center text-3xl font-bold mb-8 text-white">
            Find a mentor today by signing up for a membership!
          </h1>

          <div className="space-y-6">
            {sampleMentors.map((mentor, index) => (
              <MentorCard key={index} {...mentor} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const MentorCard = ({ name, title, specialty, school, imageUrl }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isConnected = location.state?.connectedMentor === name;

  const handleConnect = () => {
    if (!isConnected) {
      navigate("/mentor-request", {
        state: { mentor: { name, title, specialty, school } }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-fade-up flex items-center p-4"
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-24 h-24 rounded-full object-cover mr-6"
      />
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-[#0EA5E9]">{title}</p>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Specialty:</span> {specialty}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">School:</span> {school}
        </p>
      </div>
      <button
        onClick={handleConnect}
        disabled={isConnected}
        className={`ml-4 px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2
          ${isConnected 
            ? 'bg-green-500 text-white cursor-default'
            : 'bg-[#0EA5E9] text-white hover:opacity-90'
          }`}
      >
        {isConnected ? (
          <>
            <Check className="w-4 h-4" />
            Connected
          </>
        ) : (
          'Connect'
        )}
      </button>
    </motion.div>
  );
};

export default Profiles;
