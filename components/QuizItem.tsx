import Image from "next/image";
import { useEffect, useState } from "react";

interface QuizItemType {
  citation?: string;
  content: string;
  image_url?: string;
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

  const imageUrl = item.image_url
    ? `https://firebasestorage.googleapis.com/v0/b/realoraigame.appspot.com/o/${
        item.citation ? "real" : "fake"
      }%2F${encodeURIComponent(item.image_url)}?alt=media`
    : null;

  console.log("Image Url is: ", imageUrl);

  return (
    <div
      className={`border-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 shadow-md ${
        imageUrl ? "px-2 py-2" : "px-8 pt-6"
      }  cursor-pointer ${cardBgColor} ${
        showAnswer
          ? correct
            ? "border-green-500 bg-green-100"
            : "border-red-500 bg-red-100"
          : "border-gray-200"
      }`}
      onClick={handleSelect}
    >
      <div className="mb-4 flex-column justify-start">
        {imageUrl && (
          <div className="mb-4 w-full h-full max-h-full">
            <Image
              src={imageUrl}
              alt="quiz-item"
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        )}
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
