// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWDBEpDh8Br_G7jgZMjRkNC5is9qKQBbQ",
  authDomain: "great-academyy.firebaseapp.com",
  projectId: "great-academyy",
  storageBucket: "great-academyy.firebasestorage.app",
  messagingSenderId: "945427332796",
  appId: "1:945427332796:web:f6134ecd72f11e87da9ab9",
  measurementId: "G-R5YLZTPMB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);