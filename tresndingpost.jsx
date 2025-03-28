import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const data = await apiService.getTrendingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://source.unsplash.com/random/800x400?sig=${post._id}`}
              alt="Post"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={`https://source.unsplash.com/random/40x40?portrait&sig=${post.author._id}`}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{post.author.name}</span>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-semibold text-blue-500">{post.comments.length} comments</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
