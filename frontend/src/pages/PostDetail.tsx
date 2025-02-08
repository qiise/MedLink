import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      author: "CurrentUser",
      content: newReply
    };

    fetch(`http://127.0.0.1:8000/api/posts/${id}/replies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyPayload),
    })
    .then(response => response.json())
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
    <div className="min-h-screen bg-[#F6F8FA] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
            <span>{new Date(post.timestamp).toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Post a Reply</h2>
          <Textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts..."
            className="mb-4"
          />
          <Button onClick={handleSubmitReply}>Post Reply</Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Replies ({replies.length})
          </h2>
          {replies.map((reply, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-600 mb-3">{reply.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{reply.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(reply.timestamp).toLocaleString()}</span>  {/* Ensure proper date parsing */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
