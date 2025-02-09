import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, MessageCircle } from "lucide-react";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleCreatePost = (newPost: { title: string; preview: string }) => {
    const postPayload = {
      ...newPost,
      author: "CurrentUser",
      replies: 0,
      timestamp: new Date().toISOString()
    };

    fetch(`http://127.0.0.1:8000/api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postPayload),
    })
    .then(response => response.json())
    .then(createdPost => {
      setPosts([createdPost, ...posts]);
      setIsCreatingPost(false);
    })
    .catch(error => console.error('Error creating post:', error));
  };

  if (isCreatingPost) {
    return <NewPostForm onSubmit={handleCreatePost} onCancel={() => setIsCreatingPost(false)} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Community Forum</h1>
            <button 
              onClick={() => setIsCreatingPost(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
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

const NewPostForm = ({ onSubmit, onCancel }: { onSubmit: (post: { title: string; preview: string }) => void; onCancel: () => void; }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({
        title: title.trim(),
        preview: content.trim()
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discussions
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your post title..."
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px]"
            placeholder="Write your post content here..."
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            disabled={!title.trim() || !content.trim()}
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

const PostCard = ({ id, title, preview, author, replies, timestamp }: { id: number; title: string; preview: string; author: string; replies: number; timestamp: string; }) => {
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
        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
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
