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

const db = getFirestore()// yuqoridagi kodda initialize bo'lib kelishi kerak bo'lgan firebase appni agar true bo'lsa getFirestore ichida bo'ladi va db o'zgaruvchiga soladi//Yani, getFirestore() o'z ichida getApp()ni chaqiradi yani deafult shunday ishlaydi faqat yuqoridagi firebase keylar ostidagi server appni oladi

export {db}


//getApps()	Firebase ilovalari ro'yxatini qaytaradi (array).
//!getApps().length	Agar ro'yxat bo'sh bo'lsa (length === 0), demak hali hech qanday ilova initialize qilinmagan.
//initializeApp(firebaseConfig)	Firebase ilovasini firebaseConfig bilan initialize qiladi.
//getApp()	Agar ilova allaqachon initialize qilingan bo'lsa, uni qayta chaqirmasdan mavjud ilovani qaytaradi.