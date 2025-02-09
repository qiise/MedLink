import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PostDetail = () => {
  const { id } = useParams();  // Get post ID from the URL
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [post, setPost] = useState(null);

  // Fetch post details using the ID
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error("Post not found");
        return response.json();
      })
      .then(data => setPost(data))
      .catch(error => {
        console.error('Error fetching post:', error);
        navigate("/");  // Redirect back to forum if post doesn't exist
      });
  }, [id, navigate]);

  // Fetch replies for the post
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/replies/`)
      .then(response => response.json())
      .then(data => setReplies(data))
      .catch(error => console.error('Error fetching replies:', error));
  }, [id]);

  const handleSubmitReply = () => {
    if (!newReply.trim()) return;
  
    const replyPayload = {
      author: localStorage.getItem("currentUser"),
      content: newReply,
      timestamp: new Date().toISOString() 
    };
  
    fetch(`http://127.0.0.1:8000/api/posts/${id}/replies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyPayload),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(JSON.stringify(err)); });
      }
      return response.json();
    })
    .then(createdReply => {
      setReplies([createdReply, ...replies]);
      setNewReply("");
      toast({
        title: "Reply posted",
        description: "Your reply has been added to the discussion.",
      });
    })
    .catch(error => console.error('Error posting reply:', error));
  };
  

  if (!post) return <div>Loading...</div>;  // Show loading until post data is fetched

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
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)` ,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Forum
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.preview}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.timestamp).toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'numeric', 
              day: 'numeric', 
              hour: 'numeric', 
              minute: '2-digit'  // No seconds here
            })}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Post a Reply</h2>
          <Textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts..."
            className="mb-4 placeholder:text-[#0EA5E9]"
          />
          <Button onClick={handleSubmitReply} className="bg-[#0EA5E9] text-white hover:opacity-90">
            Post Reply
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-white" />
            Replies ({replies.length})
          </h2>
          {replies.map((reply, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-600 mb-3">{reply.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{reply.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(reply.timestamp).toLocaleString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric', 
                  hour: 'numeric', 
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
