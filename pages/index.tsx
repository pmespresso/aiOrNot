// pages/index.tsx
import { useState } from "react";

import Game from "./game";
import Leaderboard from "../components/Leaderboard";
import Footer from "../components/Footer";

const Home = () => {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="mx-auto p-4 flex-grow max-h-screen overflow-auto bg-gray-50 bg-opacity-75 backdrop-blur rounded-xl">
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
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {activeTab === "game" && <Game />}
          {activeTab === "leaderboard" && <Leaderboard />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
