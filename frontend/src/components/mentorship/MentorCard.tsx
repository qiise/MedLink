
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface MentorCardProps {
  name: string;
  title: string;
  specialty: string;
  school: string;
  imageUrl: string;
}

export function MentorCard({ name, title, specialty, school, imageUrl }: MentorCardProps) {
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-fade-up">
      <div className="aspect-w-3 aspect-h-2">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-primary">{title}</p>
        </div>
        <div className="space-y-2">
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
          className={`w-full px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2
            ${isConnected 
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-accent text-gray-900 hover:opacity-90'
            }`}
        >
          {isConnected ? (
            <>
              <Check className="w-4 h-4" />
              Request to connect sent!
            </>
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </div>
  );
}
