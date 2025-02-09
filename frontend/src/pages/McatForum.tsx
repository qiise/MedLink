import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  preview: string;
  author: string;
  replies: number;
  timestamp: string;
}

const McatForum = () => {
  // Mocked posts
  const mockPosts: Post[] = [
    {
      id: 1,
      title: "Best MCAT Study Resources",
      preview: "Looking for the best resources to study for the MCAT. Any suggestions?",
      author: "JaneDoe",
      replies: 12,
      timestamp: "2025-02-09T14:02:00Z",
    },
    {
      id: 2,
      title: "MCAT Study Schedule",
      preview: "Does anyone have a good MCAT study schedule they can recommend? Need some guidance.",
      author: "JohnSmith",
      replies: 8,
      timestamp: "2025-02-08T10:34:00Z",
    },
    {
      id: 3,
      title: "MCAT Practice Tests: Which Ones Are the Best?",
      preview: "I'm looking for suggestions on which practice tests are the most helpful for the MCAT. Any ideas?",
      author: "Student123",
      replies: 5,
      timestamp: "2025-02-07T18:47:00Z",
    },
    {
      id: 4,
      title: "How to Improve on the CARS Section?",
      preview: "I'm struggling with the Critical Analysis and Reasoning Skills (CARS) section. Any advice?",
      author: "FutureMD",
      replies: 15,
      timestamp: "2025-02-06T22:10:00Z",
    },
  ];

  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<string | null>("mcat");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => {
        // Filter posts with specific IDs (e.g., IDs 1, 2, and 3)
        const filteredPosts = data.filter((post: Post) => [20, 21, 22, 23].includes(post.id));
        setPosts(filteredPosts);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleTabClick = (tab: string) => {
    if (activeTab === tab) {
      setActiveTab(null); // Unselect if the same tab is clicked again
      if (tab === "mcat") {
        navigate("/forum"); // Navigate to normal forum page when mcat tab is unselected
      }
    } else {
      setActiveTab(tab); // Set new active tab
      navigate(`/forum/${tab}`);
    }
  };

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
            <h1 className="text-3xl font-bold text-white">MCAT Forum</h1>
            <button 
              onClick={() => navigate("/forum/mcat/new")}
              className="px-4 py-2 bg-white text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              New Post
            </button>
          </div>
          {/* Tabs Section */}
          <div className="mb-4 flex space-x-4">
            {["mcat", "interviews", "essays", "stats"].map((tab) => (
              <div 
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-2 rounded-lg cursor-pointer transition-opacity 
                ${activeTab === tab ? "bg-gray-400 text-white" : "bg-white text-black hover:bg-gray-200"} 
                ${activeTab === tab ? "font-semibold" : ""}`}
            >
              {tab === "mcat" ? tab.toUpperCase() : tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Make only MCAT in uppercase */}
            </div>
            ))}
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

const PostCard = ({ id, title, preview, author, replies, timestamp }: Post) => {
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

export default McatForum;
