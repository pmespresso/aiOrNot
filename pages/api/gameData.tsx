// api/game.ts

import { ref, get, query, startAfter, limitToFirst } from "firebase/database";

import { db } from "../../firebaseConfig";

const getExamples = async (collection: string) => {
  const examplesRef = ref(db, collection);

  let examplesQuery = query(examplesRef, limitToFirst(2));

  const snapshot = await get(examplesQuery);

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.val();
};

export const getRealExamples = async () => {
  return getExamples("real");
};

export const getFakeExamples = async () => {
  return getExamples("fake");
};
