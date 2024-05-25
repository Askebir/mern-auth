// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b185f.firebaseapp.com",
  projectId: "mern-auth-b185f",
  storageBucket: "mern-auth-b185f.appspot.com",
  messagingSenderId: "24712500381",
  appId: "1:24712500381:web:3dbebd66839f0b4bb63074"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);