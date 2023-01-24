import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyBQxbIK6PFksd2_weGl-SLGiCG-qu35IvE",
    authDomain: "chat-35574.firebaseapp.com",
    projectId: "chat-35574",
    storageBucket: "chat-35574.appspot.com",
    messagingSenderId: "836646217427",
    appId: "1:836646217427:web:e48501d6a0210851cf1626"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();