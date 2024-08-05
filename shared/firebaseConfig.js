// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "flex-folio-c9bea.firebaseapp.com",
  projectId: "flex-folio-c9bea",
  storageBucket: "flex-folio-c9bea.appspot.com",
  messagingSenderId: "657413502253",
  appId: "1:657413502253:web:455e46676debb7f9808fa4",
  measurementId: "G-RJZFGWD52Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
