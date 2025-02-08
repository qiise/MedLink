
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const Forum = () => {
  // Placeholder data - in a real app, this would come from an API
  const posts = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "Sarah Johnson",
      upvotes: 156,
      comments: 23,
      time: "2h ago",
    },
    {
      id: 2,
      title: "Best Practices for Modern Web Development",
      author: "Mike Chen",
      upvotes: 342,
      comments: 56,
      time: "4h ago",
    },
    {
      id: 3,
      title: "The Future of Frontend Development",
      author: "Emma Wilson",
      upvotes: 89,
      comments: 12,
      time: "6h ago",
    },
    // Add more posts for scrolling effect
    {
      id: 4,
      title: "Understanding TypeScript Generics",
      author: "Alex Kumar",
      upvotes: 234,
      comments: 45,
      time: "8h ago",
    },
    {
      id: 5,
      title: "Mastering CSS Grid Layout",
      author: "Lisa Park",
      upvotes: 167,
      comments: 34,
      time: "10h ago",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Community Forum</h1>
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Posted by {post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{post.upvotes}</div>
                    <div className="text-sm text-gray-500">upvotes</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {post.comments} comments
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Forum;
