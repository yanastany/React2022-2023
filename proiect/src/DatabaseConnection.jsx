// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANV64_TlmLHSKGTTV4yeSRipjU-MYRLpE",
  authDomain: "react-proiect-c804f.firebaseapp.com",
  projectId: "react-proiect-c804f",
  storageBucket: "react-proiect-c804f.appspot.com",
  messagingSenderId: "150344887826",
  appId: "1:150344887826:web:00cd8b444d745ca24232cb",
  measurementId: "G-SHYJY2YF7N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);