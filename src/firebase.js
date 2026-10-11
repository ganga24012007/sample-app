
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByQVqOaHMpsLfvsMADKap0uajgSGULCCc",
  authDomain: "sample-app-f0c05.firebaseapp.com",
  projectId: "sample-app-f0c05",
  storageBucket: "sample-app-f0c05.firebasestorage.app",
  messagingSenderId: "71268997654",
  appId: "1:71268997654:web:766a7a3ca2bbf1d891f337",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
