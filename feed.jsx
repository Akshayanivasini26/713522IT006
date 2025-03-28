import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const data = await apiService.getFeed();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
    // Poll for new posts every 30 seconds
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={`https://source.unsplash.com/random/40x40?sig=${post._id}`}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold">{post.author}</span>
            </div>
            {post.imageUrl && (
              <img
                src={`https://source.unsplash.com/random/600x400?sig=${post._id}`}
                alt="Post"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="text-sm text-gray-500">
              <span>{post.comments.length} comments</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
