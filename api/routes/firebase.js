import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhGqJhbhz5ZodIvZivvRYZPojFL-z4ZGw",
    authDomain: "hallo-chat-e5011.firebaseapp.com",
    projectId: "hallo-chat-e5011",
    storageBucket: "hallo-chat-e5011.appspot.com",
    messagingSenderId: "376904396902",
    appId: "1:376904396902:web:e801036a96ef8d8d307da7",
    measurementId: "G-77HPJRSY83"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);