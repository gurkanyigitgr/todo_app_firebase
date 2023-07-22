// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-JcJuO9wHd37DADsSsBVO1ybPl3oLkes",
  authDomain: "todo-app-842a4.firebaseapp.com",
  projectId: "todo-app-842a4",
  storageBucket: "todo-app-842a4.appspot.com",
  messagingSenderId: "619507061429",
  appId: "1:619507061429:web:570e48080026f7fad7e4fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
