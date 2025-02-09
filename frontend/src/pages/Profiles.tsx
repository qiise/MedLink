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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="flex items-center justify-center text-3xl font-bold mb-8">
            Find a mentor today!
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
          <p className="text-primary">{title}</p>
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
            : 'bg-accent text-gray-900 hover:opacity-90'
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
