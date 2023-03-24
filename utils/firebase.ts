import {
  get,
  set,
  ref,
  query,
  orderByChild,
  limitToFirst,
  update,
  increment,
} from "firebase/database";

import { User } from "../types";
import { db } from "../firebaseConfig";

export const updateScore = async (licenseKey: string, roundScore: number) => {
  const userRef = ref(db, `users/${licenseKey}`);

  await update(userRef, {
    score: increment(roundScore),
    roundsPlayed: increment(1),
  });
};

export const saveUserData = async (licenseKey: string, purchase) => {
  try {
    await set(ref(db, "users/" + licenseKey), {
      purchase,
      score: 0,
      roundsPlayed: 0,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTopUsers = async (): Promise<User[]> => {
  const usersRef = ref(db, "users");
  const topUsersQuery = query(
    usersRef,
    orderByChild("score"),
    limitToFirst(100),
  );

  const snapshot = await get(topUsersQuery);
  const usersData = snapshot.val();

  const users: User[] = Object.values(usersData).map((userData: any) => ({
    email: userData.purchase.email,
    roundsPlayed: userData.roundsPlayed,
    score: userData.score,
  }));

  users.sort((a, b) => b.score - a.score);
  return users;
};
