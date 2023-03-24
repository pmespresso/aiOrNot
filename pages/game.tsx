import { useState, useEffect } from "react";

import { getRealExamples, getFakeExamples } from "./api/gameData";
import QuizItem from "../components/QuizItem";
import SignInModal from "../components/SignInModal";
import { useLicenseContext } from "../contexts/LicenseContext";
import { updateScore } from "../utils/firebase";

const Game = () => {
  const { isVerified } = useLicenseContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userChoices, setUserChoices] = useState({});
  const [seenRealExamples, setSeenRealExamples] = useState([]);
  const [seenFakeExamples, setSeenFakeExamples] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setShowAnswer(false);
    const realExamples = await getRealExamples(seenRealExamples);
    const fakeExamples = await getFakeExamples(seenFakeExamples);

    console.log(realExamples);
    console.log(fakeExamples);

    const combinedItems = [...realExamples, ...fakeExamples];
    const shuffledItems = combinedItems.sort(() => Math.random() - 0.5);

    // Update the seenRealExamples and seenFakeExamples arrays with the new examples
    setSeenRealExamples((prevSeenRealExamples) =>
      prevSeenRealExamples.concat(realExamples.map((example) => example.id)),
    );
    setSeenFakeExamples((prevSeenFakeExamples) =>
      prevSeenFakeExamples.concat(fakeExamples.map((example) => example.id)),
    );

    setItems(shuffledItems);
    setLoading(false);
    setUserChoices({}); // Reset userChoices state
  };

  const handleShowAnswer = async () => {
    if (!isVerified) {
      setShowSignInModal(true);
    } else {
      const correctChoices = Object.keys(userChoices).reduce((sum, key) => {
        const isCorrect =
          userChoices[key].isReal === (items[key].citation !== undefined);
        return sum + (isCorrect ? 1 : 0);
      }, 0);

      setUserChoices({});
      await updateScore(localStorage.getItem("licenseKey"), correctChoices);
      setShowAnswer(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-gray-50">
      <h1 className="text-4xl font-serif font-semibold mb-4 text-gray-800">
        AI or Not
      </h1>
      <p className="mb-4 font-bold">
        Select the Options You Believe to be REAL.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            items.map((item, index) => (
              <QuizItem
                key={index}
                item={item}
                showAnswer={showAnswer}
                isSelected={!!userChoices[index]?.selected}
                onSelected={(isSelected) => {
                  setUserChoices((prevChoices) => ({
                    ...prevChoices,
                    [index]: {
                      selected: isSelected,
                      isReal: !!item.citation,
                    },
                  }));
                }}
              />
            ))
          )}
        </div>
        {showAnswer ? (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full sm:w-auto font-semibold py-2 px-4 rounded mt-4 float-right transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => fetchData()}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-indigo-400 hover:bg-indigo-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full sm:w-auto font-semibold py-2 px-4 rounded mt-4 float-right transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => {
              if (!isVerified) {
                setShowSignInModal(true);
              }
              handleShowAnswer();
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
