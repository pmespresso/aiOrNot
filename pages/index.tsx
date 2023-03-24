// pages/index.tsx
import { useState } from "react";
import Game from "./game";
import Leaderboard from "../components/LeaderBoard";
import { useLicenseContext } from "../contexts/LicenseContext";

const Home = () => {
  const [activeTab, setActiveTab] = useState("game");
  const { isVerified } = useLicenseContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "game" ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("game")}
          >
            Game
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "leaderboard" ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
          {isVerified && <p className="px-4 py-2 rounded-t-lg">Signed In</p>}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {activeTab === "game" && <Game />}
          {activeTab === "leaderboard" && <Leaderboard />}
        </div>
      </div>
    </div>
  );
};

export default Home;
