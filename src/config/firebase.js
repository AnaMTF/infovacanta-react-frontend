// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCpKYKqBOvTDSjM5cHQB9uNXl4K-LW-f90",
  authDomain: "infovacantareact.firebaseapp.com",
  projectId: "infovacantareact",
  storageBucket: "infovacantareact.appspot.com",
  messagingSenderId: "799984513514",
  appId: "1:799984513514:web:d09c60b6bf01a9bc728293",
  measurementId: "G-BME164HNS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // <-- aceasta variabila stocheaza toate informatiile primite de la getAuth()
export const googleProvider = new GoogleAuthProvider();
// export const providerFacebook = new FacebookAuthProvider();

// Notă: Am adăugat Firebase în proiect înainte să văd cum poate fi legat de Passport.js folosit în server, și de PostgreSQL.
// URI pentru facebook: https://infovacantareact.firebaseapp.com/__/auth/handler