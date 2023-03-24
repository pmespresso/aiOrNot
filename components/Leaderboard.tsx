import { useEffect, useState } from "react";

import { getTopUsers } from "../utils/firebase";
import { User } from "../types";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const topUsers = await getTopUsers();
      setUsers(topUsers);
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rounds Played</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.roundsPlayed}</td>
              <td className="border px-4 py-2">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
