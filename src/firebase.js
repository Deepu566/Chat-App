import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtT3cXndVRTFAvBFTSBlqBZQ9qt8nHL5g",
    authDomain: "chat-47ef8.firebaseapp.com",
    projectId: "chat-47ef8",
    storageBucket: "chat-47ef8.appspot.com",
    messagingSenderId: "374719922037",
    appId: "1:374719922037:web:24a1d8c5a5515d805f5d3c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()