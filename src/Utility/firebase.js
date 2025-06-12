// Import Firebase compat SDKs (for older Firebase syntax)
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Optional: Only include analytics if running in the browser
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBq1bBuu5TI7poMIrnPuhnRNNolVDhqk-A",
  authDomain: "back-end-clone.firebaseapp.com",
  projectId: "back-end-clone",
  storageBucket: "back-end-clone.appspot.com", // ✅ FIXED this line
  messagingSenderId: "392512778401",
  appId: "1:392512778401:web:16af2312d337cbc00200e0",
  measurementId: "G-7Y95BFP97B",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export services
export const auth = app.auth();
export const db = app.firestore();

// Initialize analytics only if it's running in the browser (avoids server-side errors)
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export default app;
