import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAb5XZuQ75gjrHO-WJXmNEnZ08v3Tl_zNY",
    authDomain: "quick-count-c4002.firebaseapp.com",
    databaseURL: "https://quick-count-c4002-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quick-count-c4002",
    storageBucket: "quick-count-c4002.appspot.com",
    messagingSenderId: "956769378026",
    appId: "1:956769378026:web:710377f1c7e52365ab4193",
    measurementId: "G-7NP54ZVC66"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);