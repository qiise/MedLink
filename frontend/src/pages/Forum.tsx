import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Community Forum</h1>
            <button 
              onClick={() => navigate("/forum/new")}
              className="px-4 py-2 bg-white text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              New Post
            </button>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const PostCard = ({ id, title, preview, author, replies, timestamp }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/post/${id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[#0EA5E9] hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{preview}</p>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{author}</span>
          <span>{new Date(timestamp).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{replies}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Forum;
