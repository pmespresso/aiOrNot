// api/auth.ts

import { ref, get } from "firebase/database";

import { db } from "../../firebaseConfig";

export const verifyEmailAndLicenseKey = async (email, licenseKey) => {
  const licenseRef = ref(db, `licenses/${licenseKey}`);

  try {
    const snapshot = await get(licenseRef);
    const data = snapshot.val();
    return data && data.email === email;
  } catch (error) {
    console.error("Error fetching license data:", error);
    return false;
  }
};
