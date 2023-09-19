// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {doc,getFirestore,setDoc} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2j4eRufgBwk6NdanPwzqgsNKBIkk_xHg",
  authDomain: "chat-4aab9.firebaseapp.com",
  projectId: "chat-4aab9",
  storageBucket: "chat-4aab9.appspot.com",
  messagingSenderId: "700731569639",
  appId: "1:700731569639:web:94cc681a76dec2cd6fb942",
  measurementId: "G-K0EJFVV4HD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore()