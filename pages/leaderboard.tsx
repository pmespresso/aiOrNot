import React from "react";
import Layout from "../components/Layout";

const Leaderboard: React.FC = () => {
  // Fetch leaderboard data and display it here
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      {/* Display the leaderboard data in a table or any desired format */}
    </div>
  );
};

export default function LeaderboardPage() {
  return (
    <Layout>
      <Leaderboard />
    </Layout>
  );
}
