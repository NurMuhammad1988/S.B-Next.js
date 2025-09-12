// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-86c64.firebaseapp.com",
  projectId: "drive-86c64",
  storageBucket: "drive-86c64.firebasestorage.app",
  messagingSenderId: "215245272696",
  appId: "1:215245272696:web:0b6349e14e57ad3f7b5f8d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

!getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()

export {db}

// 2. Firebase integration 20:31 da qoldi