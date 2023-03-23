import { useState, useEffect } from "react";

import { getRealExamples, getFakeExamples } from "./api/gameData";
import QuizItem from "../components/QuizItem";

const Game = () => {
  const [items, setItems] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <QuizItem key={index} item={item} showAnswer={showAnswer} />
          ))}
        </div>
        {showAnswer ? (
          <button
            className="bg-blue-400 border-30 px-4 py-2 float-right"
            onClick={() => fetchData()}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-blue-300 border-30 px-4 py-2 float-right"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
