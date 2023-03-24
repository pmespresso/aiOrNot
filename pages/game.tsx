import { useState, useEffect } from "react";

import { getRealExamples, getFakeExamples } from "./api/gameData";
import QuizItem from "../components/QuizItem";
import SignInModal from "../components/SignInModal";
import { useLicenseContext } from "../contexts/LicenseContext";

const Game = () => {
  const { isVerified } = useLicenseContext();
  const [items, setItems] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const fetchData = async () => {
    setShowAnswer(false);
    const realExamples = await getRealExamples();
    const fakeExamples = await getFakeExamples();

    console.log(realExamples);
    console.log(fakeExamples);

    const combinedItems = [...realExamples, ...fakeExamples];
    const shuffledItems = combinedItems.sort(() => Math.random() - 0.5);

    setItems(shuffledItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-6">AI or Not</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <QuizItem key={index} item={item} showAnswer={showAnswer} />
          ))}
        </div>
        {showAnswer ? (
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 float-right"
            onClick={() => fetchData()}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4 float-right"
            onClick={() => {
              if (!isVerified) {
                setShowSignInModal(true);
              }
              setShowAnswer(true);
            }}
          >
            Show Answer
          </button>
        )}
      </div>
      {showSignInModal && (
        <SignInModal
          onClose={() => setShowSignInModal(false)}
          onSignedIn={() => {}}
        />
      )}
    </div>
  );
};

export default Game;
