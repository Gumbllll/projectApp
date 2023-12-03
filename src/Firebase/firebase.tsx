// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhqEqZx7TaYIV-8FU-2uVma5TcE17Uqr8",
  authDomain: "files-407cd.firebaseapp.com",
  projectId: "files-407cd",
  storageBucket: "files-407cd.appspot.com",
  messagingSenderId: "1015807072795",
  appId: "1:1015807072795:web:c981be3470ae931140f6be",
  measurementId: "G-XQSCHLSKCH"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);