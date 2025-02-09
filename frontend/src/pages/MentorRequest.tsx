import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface LocationState {
  mentor: {
    name: string;
    title: string;
    specialty: string;
    school: string;
  };
}

export default function MentorRequest() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { mentor } = (location.state as LocationState) || { mentor: null };

  if (!mentor) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the request to a backend
    toast({
      title: "Request Sent!",
      description: `Your connection request has been sent to ${mentor.name}.`,
    });
    
    navigate("/profiles", { state: { connectedMentor: mentor.name } });
  };

  return (
    <div className="min-h-screen relative">
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
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/profiles")}
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mentors
        </button>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Connect with {mentor.name}
          </h1>
          
          <div className="mb-6 space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Title:</span> {mentor.title}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Specialty:</span> {mentor.specialty}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">School:</span> {mentor.school}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Introduction Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself and explain why you'd like to connect..."
                className="min-h-[200px] placeholder:text-[#0EA5E9]"
                required
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!message.trim()}
                className="bg-[#0EA5E9] text-white hover:opacity-90"
              >
                Send Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
