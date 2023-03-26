// api/game.ts

import { ref, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

import { db } from "../../firebaseConfig";

const getExamples = async (collection: string, seenExamples: string[]) => {
  const examplesRef = ref(db, collection);
  const snapshot = await get(examplesRef);

  if (!snapshot.exists()) {
    return [];
  }

  const examples = snapshot.val();
  const unseenExamples = Object.entries(examples)
    .filter(([key]) => !seenExamples.includes(key))
    .map(([key, value]: [string, any]) => ({ id: key, ...value }));

  // Shuffle the unseen examples
  const shuffledUnseenExamples = unseenExamples.sort(() => Math.random() - 0.5);

  // Get the image URLs for examples with imageFileName
  const storage = getStorage();
  const examplesWithImageURLs = await Promise.all(
    shuffledUnseenExamples.map(async (example) => {
      if (example.imageFileName) {
        const imagePath = `${collection}/${example.imageFileName}`;
        const imageRef = storageRef(storage, imagePath);
        const imageURL = await getDownloadURL(imageRef);
        return { ...example, imageURL };
      }
      return example;
    }),
  );

  // Return only the first two unseen examples
  return examplesWithImageURLs.slice(0, 2);
};

export const getRealExamples = async (seenRealExamples: string[]) => {
  return getExamples("real", seenRealExamples);
};

export const getFakeExamples = async (seenFakeExamples: string[]) => {
  return getExamples("fake", seenFakeExamples);
};
