// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnOhy87kHH5HDQwd2jtwkIjr4BRjgDGWY",
    authDomain: "neat-encoder-377700.firebaseapp.com",
    projectId: "neat-encoder-377700",
    storageBucket: "neat-encoder-377700.appspot.com",
    messagingSenderId: "325469952065",
    appId: "1:325469952065:web:616e85a51dffafc7220ec0",
    measurementId: "G-YC0X2K37LN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app); // Export firestore
export const auth = getAuth(app);              // Export auth
