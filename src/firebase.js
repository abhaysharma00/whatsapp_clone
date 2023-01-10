// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// import { getAuth } from "firebase/auth";
// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxpUSO2owMvjgKt9O9bpEwUqmFUCNPaww",
  authDomain: "whatspp-clone-3ffa8.firebaseapp.com",
  projectId: "whatspp-clone-3ffa8",
  storageBucket: "whatspp-clone-3ffa8.appspot.com",
  messagingSenderId: "501607035094",
  appId: "1:501607035094:web:e9d841dec7b1df97995977",
  measurementId: "G-SRR9PLSV79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();
// const auth = firebase.auth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
