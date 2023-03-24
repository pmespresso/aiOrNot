import { useEffect, useState } from "react";

interface QuizItemType {
  citation?: string;
  content: string;
}

interface QuizItemProps {
  item: QuizItemType;
  showAnswer: boolean;
  onSelected: (isSelected: boolean) => void;
  isSelected: boolean;
}

const QuizItem: React.FC<QuizItemProps> = ({
  item,
  showAnswer,
  onSelected,
  isSelected,
}) => {
  const [cardBgColor, setCardBgColor] = useState("bg-gray-200");
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setCardBgColor(isSelected ? "bg-blue-200" : "bg-gray-200");
  }, [isSelected]);

  useEffect(() => {
    const isCorrect =
      (item.citation && isSelected) || (!item.citation && !isSelected);
    setCorrect(isCorrect);
  }, [isSelected, item.citation]);

  const handleSelect = () => {
    onSelected(!isSelected);
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 shadow-md px-8 pt-6 pb-8 mb-4 cursor-pointer ${cardBgColor} ${
        showAnswer
          ? correct
            ? "border-green-500 bg-green-100"
            : "border-red-500 bg-red-100"
          : "border-gray-200"
      }`}
      onClick={handleSelect}
    >
      <div className="mb-4 flex-column justify-start">
        <p className="mb-4">{item.content}</p>
        {showAnswer && (
          <div className="flex-column mb-4 justify-start align-baseline">
            <p className="text-xl font-light">
              {correct ? `Correct ✅` : "Wrong ❌"}
            </p>
            {item.citation && (
              <a
                target="_blank"
                href={item.citation}
                className="text-sm font-normal underline"
              >
                This is REAL! (Click for Source)
              </a>
            )}
            {!item.citation && (
              <p className="text-sm font-normal block">This is FAKE!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizItem;
