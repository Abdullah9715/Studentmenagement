// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYzFqOujPKzSjIl6GKxqit8aBIC_Tnfu8",
  authDomain: "student-a5dbf.firebaseapp.com",
  projectId: "student-a5dbf",
  storageBucket: "student-a5dbf.appspot.com",
  messagingSenderId: "726809494418",
  appId: "1:726809494418:web:73a50e4229190568ac374b",
  measurementId: "G-RKZZ8M8WD1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}