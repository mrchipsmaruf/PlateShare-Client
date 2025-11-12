// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP-yc-hVyb-WA-mcwWinjdKVdBDOUgbgw",
    authDomain: "plateshare-84cd4.firebaseapp.com",
    projectId: "plateshare-84cd4",
    storageBucket: "plateshare-84cd4.firebasestorage.app",
    messagingSenderId: "695332295897",
    appId: "1:695332295897:web:77e358072b61d89e675ac8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
