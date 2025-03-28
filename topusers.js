import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiService.getTopUsers();
        setUsers(data.slice(0, 5)); // Only take top 5 users
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top Users</h2>
      <div className="grid gap-4">
        {users.map((user, index) => (
          <div key={user._id} className="bg-white p-6 shadow-lg rounded-lg flex items-center">
            <div className="relative">
              <img
                src={`https://source.unsplash.com/random/80x80?portrait&sig=${user._id}`}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
              <span className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                #{index + 1}
              </span>
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">Total Posts: {user.postCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers;
