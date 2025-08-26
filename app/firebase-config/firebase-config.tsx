// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword as firebaseSignIn } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ_h8hsYSrF6n_aUHNcSM9Sxarjy9vdis",
  authDomain: "homelibrary-3eb02.firebaseapp.com",
  projectId: "homelibrary-3eb02",
  storageBucket: "homelibrary-3eb02.appspot.com",
  messagingSenderId: "193740511363",
  appId: "1:193740511363:web:1aa41e575c0e79ae3be3b6"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Helper function for signing in
export const signIn = (email: string, password: string) =>
  firebaseSignIn(auth, email, password);

export { app, auth, db };
