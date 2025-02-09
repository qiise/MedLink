import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newPost = {
        title: title.trim(),
        preview: content.trim(),
        author: localStorage.getItem("currentUser"),
        replies: 0,
        timestamp: new Date().toISOString()
      };

      fetch(`http://127.0.0.1:8000/api/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      .then(response => response.json())
      .then(() => {
        navigate("/forum"); // Redirect to the forum after submission
      })
      .catch(error => console.error('Error creating post:', error));
    }
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
          onClick={() => navigate("/forum")}
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create a New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-[#0EA5E9]"
                placeholder="Enter your post title..."
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Post Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px] placeholder:text-[#0EA5E9]"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/forum")}
                className="text-gray-600 hover:text-gray-900"
              > 
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                className="bg-[#0EA5E9] text-white hover:opacity-90"
              >
                Create Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
