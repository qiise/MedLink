import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();  // Get the post ID from the URL
  const navigate = useNavigate();  // To navigate back after submitting the reply
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState('');

  // Fetch the details of the post
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/`)  // Assuming this is your API route for individual posts
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  // Handle submitting a reply
  const handleReplySubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/posts/${id}/replies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: reply }),
    })
      .then(response => response.json())
      .then(data => {
        setPost(prevPost => ({
          ...prevPost,
          replies: [...prevPost.replies, data],  // Add the new reply to the list
        }));
        setReply('');  // Clear the reply form
      })
      .catch(error => console.error('Error posting reply:', error));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold">{post.title}</h2>
      <p className="text-lg mt-4">{post.content}</p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Replies:</h3>
        {post.replies.length > 0 ? (
          post.replies.map(reply => (
            <div key={reply.id} className="border-b py-2">
              <p>{reply.content}</p>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      {/* Reply form */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold">Post a Reply:</h4>
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
            disabled={!reply.trim()}
          >
            Submit Reply
          </button>
        </form>
      </div>

      {/* Button to go back to the forum */}
      <button
        onClick={() => navigate(-1)}  // Go back to the previous page (forum)
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-opacity"
      >
        Back to Forum
      </button>
    </div>
  );
};

export default PostDetail;
