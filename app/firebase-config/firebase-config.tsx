// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ_h8hsYSrF6n_aUHNcSM9Sxarjy9vdis",
  authDomain: "homelibrary-3eb02.firebaseapp.com",
  projectId: "homelibrary-3eb02",
  storageBucket: "homelibrary-3eb02.appspot.com",
  messagingSenderId: "193740511363",
  appId: "1:193740511363:web:1aa41e575c0e79ae3be3b6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Corrected
const db: Firestore = getFirestore(app);

// Export correctly
export { app, auth, db, signInWithEmailAndPassword };
