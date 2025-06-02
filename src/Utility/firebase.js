// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq1bBuu5TI7poMIrnPuhnRNNolVDhqk-A",
  authDomain: "back-end-clone.firebaseapp.com",
  projectId: "back-end-clone",
  storageBucket: "back-end-clone.firebasestorage.app",
  messagingSenderId: "392512778401",
  appId: "1:392512778401:web:16af2312d337cbc00200e0",
  measurementId: "G-7Y95BFP97B",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
export const auth = app.auth();
export const db = app.firestore();

// Analytics (optional)
const analytics = getAnalytics(app);

export default app;
