
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    
    navigate("/", { state: { connectedMentor: mentor.name } });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
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
                className="min-h-[200px]"
                required
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!message.trim()}
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
