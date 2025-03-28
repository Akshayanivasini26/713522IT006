import axios from "axios";

const API_URL = "http://20.244.56.144/test"; // Base URL

export const apiService = {
  getFeed: async () => {
    try {
      const response = await axios.get(`${API_URL}/feed`);
      return response.data;
    } catch (error) {
      console.error("Error fetching feed:", error);
      throw error;
    }
  },

  getTrendingPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}/trending-posts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trending posts:", error);
      throw error;
    }
  },

  getTopUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/top-users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching top users:", error);
      throw error;
    }
  }
};
