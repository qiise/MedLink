import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  id: number;  // Add ID to the props
  title: string;
  preview: string;
  author: string;
  replies: number;
  timestamp: string;
}

export function PostCard({ id, title, preview, author, replies, timestamp }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/post/${id}`)}  // Navigate using dynamic post ID
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-up cursor-pointer"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{preview}</p>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{author}</span>
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{replies}</span>
        </div>
      </div>
    </div>
  );
}
