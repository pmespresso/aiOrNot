import { useState } from "react";

import AuthForm from "../components/AuthForm";
import Game from "./game";

const Home = () => {
  const [showGame, setShowGame] = useState(false);

  const handleAuthSuccess = () => {
    setShowGame(true);
  };

  return (
    <div className="container mx-auto p-4">
      {showGame ? (
        <Game />
      ) : (
        <div className="w-full max-w-md mx-auto mt-10">
          <h1 className="text-3xl mb-4">Sign Up / Login</h1>
          <AuthForm onSuccess={handleAuthSuccess} />
        </div>
      )}
    </div>
  );
};

export default Home;
