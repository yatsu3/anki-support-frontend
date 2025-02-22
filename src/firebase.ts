// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCqZFY5m2T2Epic-_f8lnrmzjQ3DnAKA7o",
  authDomain: "anki-support.firebaseapp.com",
  projectId: "anki-support",
  storageBucket: "anki-support.firebasestorage.app",
  messagingSenderId: "329120727484",
  appId: "1:329120727484:web:05fbff466173f414ee6bb9",
});

// Initialize Firebase
export const auth = getAuth(firebaseConfig);
