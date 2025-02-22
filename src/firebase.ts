// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_ANKI_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_ANKI_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_ANKI_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_ANKI_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_ANKI_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_ANKI_APP_FIREBASE_APP_ID,
});

// Initialize Firebase
export const auth = getAuth(firebaseConfig);
