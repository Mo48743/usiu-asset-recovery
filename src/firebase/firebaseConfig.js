// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyD36iqMZJmfRQhekglkewHWIM0r-AhY9aw",
  authDomain: "usiu-asset-recovery.firebaseapp.com",
  projectId: "usiu-asset-recovery",
  storageBucket: "usiu-asset-recovery.appspot.com",
  messagingSenderId: "713999076073",
  appId: "1:713999076073:web:2317c31f94e5d141983e78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Add this line
export default app;
