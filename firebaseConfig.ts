import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYr6W9PqKyzhjsjueJLPJediBjGXiQcYo",

  authDomain: "realoraigame.firebaseapp.com",

  projectId: "realoraigame",

  storageBucket: "realoraigame.appspot.com",

  messagingSenderId: "405784845181",

  appId: "1:405784845181:web:636620c57e3768719a8a14",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
