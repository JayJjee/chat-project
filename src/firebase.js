import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1IbIEDVJ2aJYUKj36xvjVIRN5BF3D69Q",
    authDomain: "chat-6488d.firebaseapp.com",
    projectId: "chat-6488d",
    storageBucket: "chat-6488d.appspot.com",
    messagingSenderId: "535832467572",
    appId: "1:535832467572:web:4074acee18da200b951921"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
