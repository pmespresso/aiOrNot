import { useCallback, useEffect, useState } from "react";

interface QuizItemType {
  citation?: string;
  content: string;
}

const QuizItem = ({
  item,
  showAnswer,
}: {
  item: QuizItemType;
  showAnswer: boolean;
}) => {
  const [cardBgColor, setCardBgColor] = useState("bg-gray-200");
  const [userVote, setUserVote] = useState(false);

  console.log("item in QuizItem", item);

  useEffect(() => {
    setCardBgColor(userVote ? "bg-blue-200" : "bg-gray-200");
  }, [userVote]);

  useEffect(() => {
    setUserVote(false);
  }, [showAnswer]);

  const handleUserVote = () => {
    setUserVote(!userVote);
  };

  return (
    <div
      className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 cursor-pointer ${cardBgColor}`}
      onClick={handleUserVote}
    >
      <div className="mb-4">
        <p>{item.content}</p>
        {showAnswer ? (
          <p className="text-gray-500 text-xs mt-2">
            {userVote && item.citation ? "✅" : "❌"}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default QuizItem;
