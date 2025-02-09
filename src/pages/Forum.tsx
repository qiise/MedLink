import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts from the backend on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`); // Navigate to the PostDetail page
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, #0EA5E9 0%, transparent 50%),
             radial-gradient(circle at 75% 20%, #0EA5E9 0%, transparent 50%),
             black`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <div className="absolute inset-0 z-10" />
      <div className="relative z-20">
        <header className="bg-black bg-opacity-90 text-white p-4 fixed top-0 w-full z-50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              MedLink
            </div>
            <div className="text-3xl font-bold tracking-wide absolute left-1/2 -translate-x-1/2">
              FORUM
            </div>
          </div>
        </header>

        <main className="pt-24 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h1 className="text-2xl font-bold text-white">Welcome to the MCAT Forum!</h1>
          </div>

          {/* Forum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{post.preview}</p>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{post.author}</span>
                    <span>{new Date(post.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/forum/new')}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              New Post
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forum;
