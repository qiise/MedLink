import { useState, useEffect } from "react";  // Add useEffect here
import { PostCard } from "./PostCard";
import { NewPostForm } from "./NewPostForm";

const initialPosts = [
  {
    title: "Tips for MCAT preparation?",
    preview: "I'm planning to take the MCAT in 6 months and would love some advice on study materials and scheduling.",
    author: "PreMedStudent22",
    replies: 12,
    timestamp: "2h ago"
  },
  {
    title: "Clinical volunteering during COVID",
    preview: "Looking for advice on finding clinical experience opportunities during these challenging times.",
    author: "FutureMD2025",
    replies: 8,
    timestamp: "5h ago"
  },
  {
    title: "Personal Statement Review Request",
    preview: "Would appreciate feedback on my personal statement draft. Focus is on my journey through clinical research.",
    author: "ResearchMD",
    replies: 15,
    timestamp: "1d ago"
  }
];

export function ForumTab() {
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

    var id = 1234

    console.log(postPayload)

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
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Discussions</h2>
        <button 
          onClick={() => setIsCreatingPost(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          New Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />  // Pass ID to PostCard
        ))}
      </div>
    </div>
  );
}
