import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import TopUsersPage from "./pages/TopUsersPage";
import TrendingPostsPage from "./pages/TrendingPostsPage";
import FeedPage from "./pages/FeedPage";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen">
        <nav className="mb-4 bg-white shadow-md p-4 rounded-lg">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Social Analytics</h1>
            <div className="flex gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-500`
                }
              >
                Feed
              </NavLink>
              <NavLink 
                to="/top-users" 
                className={({ isActive }) =>
                  `${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-500`
                }
              >
                Top Users
              </NavLink>
              <NavLink 
                to="/trending-posts" 
                className={({ isActive }) =>
                  `${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'} hover:text-blue-500`
                }
              >
                Trending Posts
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/top-users" element={<TopUsersPage />} />
            <Route path="/trending-posts" element={<TrendingPostsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
export default App;
import React from 'react';

const PostCard = ({ post, trending = false }) => {
  return (
    <div className={`bg-white rounded-lg ${trending ? 'shadow-lg' : 'shadow-md'} overflow-hidden`}>
      {trending && (
        <img
          src={`https://source.unsplash.com/random/800x400?sig=${post._id}`}
          alt="Post"
          className="w-full h-64 object-cover"
        />
      )}
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
          <span className={`${trending ? 'font-semibold text-blue-500' : ''}`}>
            {post.comments.length} comments
          </span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
import React from 'react';

const UserCard = ({ user, rank }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
      <div className="relative">
        <img
          src={`https://source.unsplash.com/random/80x80?portrait&sig=${user._id}`}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <span className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          #{rank}
        </span>
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-600">Total Posts: {user.postCount}</p>
      </div>
    </div>
  );
};

export default UserCard;
