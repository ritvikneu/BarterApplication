

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzp55aHFh3kIY14q7nTtqMZJSfIVWBp_o",
    authDomain: "barterapp-2793e.firebaseapp.com",
    projectId: "barterapp-2793e",
    storageBucket: "barterapp-2793e.appspot.com",
    messagingSenderId: "47896281177",
    appId: "1:47896281177:web:ab04f0594600f4ffcd3148",
    measurementId: "G-DF6PQZ1TV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app
