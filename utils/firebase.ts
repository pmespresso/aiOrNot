import { ref, set } from "firebase/database";

import { db } from "../firebaseConfig";

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
