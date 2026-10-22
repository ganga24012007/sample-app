
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-42-0mjLDyEioRl_b4A85k21TlpQIdg0",
  authDomain: "new-app-aab17.firebaseapp.com",
  projectId: "new-app-aab17",
  storageBucket: "new-app-aab17.firebasestorage.app",
  messagingSenderId: "1065742946147",
  appId: "1:1065742946147:web:6cead205f429d41cb4cd56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
